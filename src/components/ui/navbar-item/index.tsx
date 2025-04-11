import { tv } from 'tailwind-variants';
import { renderIcon } from '../../icons/helpers';
import { TIconVariant } from '../../icons/types';
import { Link } from 'react-router'; 

const navbarItem = tv({
  base: 'flex flex-col items-center justify-center gap-1 p-2 transition-colors',
  variants: {
    active: {
      true: 'text-black-1 font-medium',
      false: 'text-grey-3 hover:text-black-1',
    },
  },
});

interface INavbarItemProps {
  isActive: boolean;
  className?: string;
  text: string;
  icon: TIconVariant;
  path: string;
  onClick: () => void;
}

export const NavbarItem = ({
  isActive,
  className,
  text,
  icon,
  path,
  onClick,
}: INavbarItemProps) => {
  const fill = isActive ? '#333' : '#8f8f8f';

  return (
    <li className="list-none">
      <Link
        to={path}
        className={navbarItem({ active: isActive, className })}
        onClick={onClick}
      >
        {renderIcon(icon, { fill, height: 24 })}
        <span className="text-12-20-medium">{text}</span>
      </Link>
    </li>
  );
};