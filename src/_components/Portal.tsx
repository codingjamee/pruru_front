'use client';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC<PropsWithChildren<{ portalTargetId?: string }>> = ({
  children,
  portalTargetId,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return <></>;

  return mounted ? (
    createPortal(
      children,
      document.getElementById(portalTargetId || 'root') as HTMLElement,
    )
  ) : (
    <></>
  );
};

export default Portal;
