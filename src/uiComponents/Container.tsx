import { cn } from '@/libs';
import { defineComponent, type VNodeChild } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

type HTMLDivProps = JSX.IntrinsicElements['div'];

interface ContainerProps extends HTMLDivProps {
  children?: VNodeChild;
}

const ContainerUI = ({
  children,
  class: className,
  ...props
}: ContainerProps): JSX.Element => (
  <div
    {...props}
    class={cn('h-screen flex justify-center items-center', className)}
  >
    {children}
  </div>
);

export default defineComponent({
  name: 'Container',
  setup(_, { slots, attrs }) {
    return () => ContainerUI({ children: slots.default?.(), ...attrs });
  },
});
