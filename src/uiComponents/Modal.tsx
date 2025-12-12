import {
  defineComponent,
  Transition,
  type PropType,
  type VNodeChild,
} from 'vue';
import type { JSX } from 'vue/jsx-runtime';

type ModalAnimation =
  | 'fade'
  | 'bubble'
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';

interface ModalUIProps {
  open: boolean;
  title?: string;
  animation?: ModalAnimation;
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

const panelAnimations: Record<ModalAnimation, AnimClasses> = {
  fade: {
    enterActive: 'transition-opacity duration-200 ease-out',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leaveActive: 'transition-opacity duration-150 ease-in',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  bubble: {
    enterActive: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leaveActive: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  },
  scale: {
    enterActive: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leaveActive: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  },
  'slide-up': {
    enterActive: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leaveActive: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-4',
  },
  'slide-down': {
    enterActive: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 -translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leaveActive: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 -translate-y-4',
  },
  'slide-left': {
    enterActive: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 translate-x-4',
    enterTo: 'opacity-100 translate-x-0',
    leaveActive: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: 'opacity-0 translate-x-4',
  },
  'slide-right': {
    enterActive: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 -translate-x-4',
    enterTo: 'opacity-100 translate-x-0',
    leaveActive: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: 'opacity-0 -translate-x-4',
  },
};

const overlayAnim: AnimClasses = {
  enterActive: 'transition-opacity duration-200 ease-out',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leaveActive: 'transition-opacity duration-150 ease-in',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
};

const ModalUI = ({
  open,
  title,
  animation = 'bubble',
  closable = true,
  overlayClosable = true,
  onClose,
  children,
  footer,
}: ModalUIProps): JSX.Element => {
  const panelAnim = panelAnimations[animation] ?? panelAnimations.fade;

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
            class="fixed inset-0 z-40 bg-black/40"
            onClick={handleOverlayClick}
          />
        )}
      </Transition>

      {/* Panel */}
      <Transition
        enterActiveClass={panelAnim.enterActive}
        enterFromClass={panelAnim.enterFrom}
        enterToClass={panelAnim.enterTo}
        leaveActiveClass={panelAnim.leaveActive}
        leaveFromClass={panelAnim.leaveFrom}
        leaveToClass={panelAnim.leaveTo}
      >
        {open && (
          <div class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div class="pointer-events-auto w-full max-w-lg mx-4">
              <div class="relative rounded-2xl bg-white shadow-xl p-6">
                {closable && (
                  <button
                    type="button"
                    class="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                  >
                    <span class="sr-only">Close</span>✕
                  </button>
                )}

                {title && (
                  <h2 class="text-lg font-semibold text-gray-900 pr-8 mb-3">
                    {title}
                  </h2>
                )}

                <div class="text-sm text-gray-700">{children}</div>

                {footer && (
                  <div class="mt-4 flex justify-end gap-2">{footer}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

export default defineComponent({
  name: 'VModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: String,
    animation: {
      type: String as PropType<ModalAnimation>,
      default: 'bubble',
    },
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
      ModalUI({
        open: props.modelValue,
        title: props.title,
        animation: props.animation,
        closable: props.closable,
        overlayClosable: props.overlayClosable,
        onClose: handleClose,
        children: slots.default?.(),
        footer: slots.footer?.(),
      });
  },
});
