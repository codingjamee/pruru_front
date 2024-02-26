export type ButtonType = 'button' | 'reset' | 'submit';

interface AnchorOptions {
  href?: string;
  rel?: string;
  target?: string;
}

export interface UseButtonPropsOptions extends AnchorOptions {
  disabled?: boolean;
  type?: ButtonType;
  tagName?: keyof JSX.IntrinsicElements;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface UseButtonPropsMetadata {
  tagName: React.ElementType;
}

export function useButtonProps({
  rel,
  target,
  disabled,
  type,
  tagName,
  onClick,
}: UseButtonPropsOptions): [UseButtonPropsOptions, UseButtonPropsMetadata] {
  if (!tagName) {
    if (target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }

  const meta: UseButtonPropsMetadata = { tagName };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (disabled || tagName === 'a') {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    return onClick?.(event);
  };

  if (tagName === 'button') {
    return [
      { type: (type as any) || 'button', disabled, onClick: handleClick },
      meta,
    ];
  }

  return [
    {
      rel: tagName === 'a' ? rel : undefined,
      target: tagName === 'a' ? target : undefined,
      disabled: undefined,
      onClick: handleClick,
    },
    meta,
  ];
}
