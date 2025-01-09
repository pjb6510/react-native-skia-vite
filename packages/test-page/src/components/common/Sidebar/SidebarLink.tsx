import { FC } from 'react';
import { cn } from '../../../utils/cn';

type SidebarLinkProps = {
  children?: React.ReactNode | React.ReactNode[];
  active?: boolean;
} & React.ComponentProps<'a'>;

export const SidebarLink: FC<SidebarLinkProps> = ({ active = false, children, ...props }) => {
  return (
    <a
      className={
        cn(
          {
            [`rounded mb-1 px-2 py-1 cursor-pointer hover:bg-blue-50`]:true,
            [`bg-blue-200`]: active,
          }
        )
      }
      {...props}
    >
      {children}
    </a>
  );
};
