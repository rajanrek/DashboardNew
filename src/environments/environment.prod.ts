// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  'apibase': 'http://uatadmin.garudauav.com/services/',
  "mapboxAccessToken": "pk.eyJ1IjoiYWdhbmpvbyIsImEiOiJjamU2ZTA5MXcxc2ozMzBycWEzNXM4aDAzIn0.axzF_Kq3StzWSmQC8hoccg",
  "s3BucketUrl": "http://s3.ap-south-1.amazonaws.com/garudauav-in",
};
