import { useState } from 'react';
import { profile } from '../../../data/profile';
import { DevHint } from '../../ui/DevHint';

/** Portrait whose edges fade into the page, so its dark backdrop has no hard frame. */
export function HeroPhoto() {
  const [failed, setFailed] = useState(!profile.photo);

  return (
    <div className="relative isolate mx-auto w-full max-w-sm lg:mr-0">
      <div className="aspect-[4/5]">
        {failed ? (
          <div className="grid h-full place-items-center font-display text-8xl font-bold text-accent-soft">
            {profile.name.charAt(0)}
          </div>
        ) : (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="h-full w-full [mask-image:radial-gradient(ellipse_closest-side,black_60%,transparent_100%)] object-cover object-[center_15%]"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {failed && (
        <div className="mt-4">
          <DevHint>Add your photo as public/me.jpg (or change profile.photo in src/data/profile.ts).</DevHint>
        </div>
      )}
    </div>
  );
}
