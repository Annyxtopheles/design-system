import React, { useState } from 'react';
import './Avatar.scss';

export interface AvatarProps {
  /** Source URL for the image */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Name to use for generating initials if image fails or is absent */
  name?: string;
  /** Size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape of the avatar */
  shape?: 'circle' | 'square';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Custom badge element */
  badge?: React.ReactNode;
}

const generateInitials = (name: string) => {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  size = 'md',
  shape = 'circle',
  status,
  badge,
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = generateInitials(name || '');
  const showImage = src && !imageError;

  return (
    <div className={`ds-Avatar ds-Avatar--size-${size} ds-Avatar--shape-${shape}`}>
      <div className="ds-Avatar__content">
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="ds-Avatar__image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="ds-Avatar__initials" aria-label={name || 'Avatar'}>
            {initials}
          </div>
        )}
      </div>
      {status && !badge && (
        <span className={`ds-Avatar__status ds-Avatar__status--${status}`} aria-label={`Status: ${status}`} />
      )}
      {badge && <div className="ds-Avatar__badge">{badge}</div>}
    </div>
  );
};

export default Avatar;
