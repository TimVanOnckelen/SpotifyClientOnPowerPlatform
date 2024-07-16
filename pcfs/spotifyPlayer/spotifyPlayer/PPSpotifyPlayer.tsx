import * as React from 'react';

export interface IPPSpotifyPlayerProps {
  token?: string;
  playername?: string;
  getDeviceId: (id: string) => void;
}

export const PPSpotifyPlayer = (props: IPPSpotifyPlayerProps) => {
  const { token, playername, getDeviceId } = props;
  const [player, setPlayer] = React.useState<Spotify.Player>();

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: playername!,
        getOAuthToken: (cb) => {
          cb(token!);
        },
        volume: 1,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        getDeviceId(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        getDeviceId(device_id);
        console.log('could not load player?');
      });

      player.connect();
    };
  }, []);

  return <></>;
};
