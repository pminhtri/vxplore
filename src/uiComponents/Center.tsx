import { cn } from '@/libs';
import { defineComponent, type VNodeChild } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

type HTMLDivProps = JSX.IntrinsicElements['div'];

interface CenterProps extends HTMLDivProps {
  children?: VNodeChild;
}

const CenterUI = ({ children, ...props }: CenterProps): JSX.Element => (
  <div
    {...props}
    class={cn(
      'flex w-full h-full flex-1 justify-center items-center',
      props.class,
    )}
  >
    {children}
  </div>
);

export default defineComponent({
  name: 'VCenter',
  setup(_, { slots, attrs }) {
    return () => CenterUI({ children: slots.default?.(), ...attrs });
  },
});
