interface ChildNodeExtended extends ChildNode {
  tabIndex?: number;
  disabled?: boolean;
  ariaDisabled?: boolean;
  href?: string;
  rel?: string;
  type?: string;
  focus?: () => void;
}

export const isFocusable = (element: ChildNodeExtended): boolean => {
  const { tabIndex, ariaDisabled, disabled } = element;

  if ((tabIndex !== undefined && tabIndex < 0) || disabled || ariaDisabled) {
    return false;
  }

  if (tabIndex !== undefined && tabIndex >= 0) {
    return true;
  }

  const { nodeName, href, rel, type } = element;

  switch (nodeName) {
    case 'A':
      return !!href && rel != 'ignore';
    case 'INPUT':
      return type != 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

export const attemptFocus = (element: ChildNodeExtended): boolean => {
  const isElementFocusable = isFocusable(element);

  if (isElementFocusable && element.focus) {
    element.focus();
  }

  return isElementFocusable;
};

export const focusFirstDescendant = (
  element: HTMLElement | ChildNodeExtended,
): boolean => {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];

    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }

  return false;
};

export const focusLastDescendant = (
  element: HTMLElement | ChildNodeExtended,
): boolean => {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];

    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true;
    }
  }

  return false;
};
