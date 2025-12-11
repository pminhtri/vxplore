import {
  defineComponent,
  Transition,
  type PropType,
  type VNodeChild,
} from 'vue';
import type { JSX } from 'vue/jsx-runtime';

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

interface DrawerUIProps {
  open: boolean;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: string;
  closable?: boolean;
  overlayClosable?: boolean;
  onClose?: () => void;
  children?: VNodeChild;
  footer?: VNodeChild;
}

type AnimClasses = {
  enterActive: string;
  enterFrom: string;
  enterTo: string;
  leaveActive: string;
  leaveFrom: string;
  leaveTo: string;
};

const drawerAnimations: Record<DrawerPlacement, AnimClasses> = {
  left: {
    enterActive: 'transition-transform duration-300 ease-in-out',
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leaveActive: 'transition-transform duration-300 ease-in-out',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full',
  },
  right: {
    enterActive: 'transition-transform duration-300 ease-in-out',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leaveActive: 'transition-transform duration-300 ease-in-out',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
  },
  top: {
    enterActive: 'transition-transform duration-300 ease-in-out',
    enterFrom: '-translate-y-full',
    enterTo: 'translate-y-0',
    leaveActive: 'transition-transform duration-300 ease-in-out',
    leaveFrom: 'translate-y-0',
    leaveTo: '-translate-y-full',
  },
  bottom: {
    enterActive: 'transition-transform duration-300 ease-in-out',
    enterFrom: 'translate-y-full',
    enterTo: 'translate-y-0',
    leaveActive: 'transition-transform duration-300 ease-in-out',
    leaveFrom: 'translate-y-0',
    leaveTo: 'translate-y-full',
  },
};

const overlayAnim: AnimClasses = {
  enterActive: 'transition-opacity duration-300 ease-in-out',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leaveActive: 'transition-opacity duration-300 ease-in-out',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
};

const getSizeClass = (placement: DrawerPlacement, size: DrawerSize = 'md') => {
  if (placement === 'left' || placement === 'right') {
    switch (size) {
      case 'sm':
        return 'w-64 max-w-full';
      case 'md':
        return 'w-80 max-w-full';
      case 'lg':
        return 'w-96 max-w-full';
      case 'full':
        return 'w-screen';
      default:
        return 'w-80 max-w-full';
    }
  } else {
    const base = 'w-full';
    switch (size) {
      case 'sm':
        return `${base} h-40 max-h-full`;
      case 'md':
        return `${base} h-60 max-h-full`;
      case 'lg':
        return `${base} h-80 max-h-full`;
      case 'full':
        return `${base} h-screen`;
      default:
        return `${base} h-60 max-h-full`;
    }
  }
};

const getWrapperClass = (placement: DrawerPlacement): string => {
  switch (placement) {
    case 'left':
      return 'fixed inset-y-0 left-0 z-50 flex max-w-full';
    case 'right':
      return 'fixed inset-y-0 right-0 z-50 flex max-w-full';
    case 'top':
      return 'fixed inset-x-0 top-0 z-50 flex flex-col max-h-full';
    case 'bottom':
      return 'fixed inset-x-0 bottom-0 z-50 flex flex-col max-h-full';
  }
};

const DrawerUI = ({
  open,
  placement = 'right',
  size = 'md',
  title,
  closable = true,
  overlayClosable = true,
  onClose,
  children,
  footer,
}: DrawerUIProps): JSX.Element => {
  const anim = drawerAnimations[placement];
  const sizeClass = getSizeClass(placement, size);
  const wrapperClass = getWrapperClass(placement);

  const handleOverlayClick = () => {
    if (overlayClosable && onClose) onClose();
  };

  return (
    <>
      {/* Overlay */}
      <Transition
        enterActiveClass={overlayAnim.enterActive}
        enterFromClass={overlayAnim.enterFrom}
        enterToClass={overlayAnim.enterTo}
        leaveActiveClass={overlayAnim.leaveActive}
        leaveFromClass={overlayAnim.leaveFrom}
        leaveToClass={overlayAnim.leaveTo}
      >
        {open && (
          <div
            class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        )}
      </Transition>

      {/* Panel */}
      <Transition
        enterActiveClass={anim.enterActive}
        enterFromClass={anim.enterFrom}
        enterToClass={anim.enterTo}
        leaveActiveClass={anim.leaveActive}
        leaveFromClass={anim.leaveFrom}
        leaveToClass={anim.leaveTo}
      >
        {open && (
          <div
            class={wrapperClass}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
          >
            <div
              class={`pointer-events-auto bg-white shadow-2xl ${sizeClass} flex flex-col`}
            >
              {/* Header */}
              {(title || closable) && (
                <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  {title && (
                    <h2
                      id="drawer-title"
                      class="text-lg font-semibold text-gray-900"
                    >
                      {title}
                    </h2>
                  )}
                  {closable && (
                    <button
                      type="button"
                      class="rounded-md p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={onClose}
                    >
                      <span class="sr-only">Close panel</span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div class="flex-1 overflow-y-auto px-4 py-4">{children}</div>

              {/* Footer */}
              {footer && (
                <div class="border-t border-gray-100 px-4 py-3 bg-gray-50 flex justify-end gap-2">
                  {footer}
                </div>
              )}
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

export default defineComponent({
  name: 'Drawer',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    placement: {
      type: String as PropType<DrawerPlacement>,
      default: 'right',
    },
    size: {
      type: String as PropType<DrawerSize>,
      default: 'md',
    },
    title: String,
    closable: {
      type: Boolean,
      default: true,
    },
    overlayClosable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { slots, emit }) {
    const handleClose = () => {
      emit('update:modelValue', false);
      emit('close');
    };

    return () =>
      DrawerUI({
        open: props.modelValue,
        placement: props.placement,
        size: props.size,
        title: props.title,
        closable: props.closable,
        overlayClosable: props.overlayClosable,
        onClose: handleClose,
        children: slots.default?.(),
        footer: slots.footer?.(),
      });
  },
});
