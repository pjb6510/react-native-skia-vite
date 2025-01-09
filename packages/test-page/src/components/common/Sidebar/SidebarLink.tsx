import { FC } from 'react';

type SidebarLinkProps = {
  children?: React.ReactNode | React.ReactNode[];
} & React.ComponentProps<'a'>;

export const SidebarLink: FC<SidebarLinkProps> = ({ children, ...props }) => {
  return (
    <a
      className={`rounded mb-1 px-2 py-1 cursor-pointer bg-blue-200 hover:bg-blue-50`}
      {...props}
    >
      {children}
    </a>
  );
};
