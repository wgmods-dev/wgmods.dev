import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// Custom logo components using createElement
const WoTLogo = () => createElement('svg', {
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  x: '0px',
  y: '0px',
  width: '24px',
  height: '43px',
  viewBox: '0 0 24 43',
  xmlSpace: 'preserve'
}, createElement('path', {
  fillRule: 'evenodd',
  clipRule: 'evenodd',
  fill: 'currentColor',
  d: 'M12.0079,38L0.1203,26.2519V11.3133L6.5077,5h11.1349l6.2371,6.1648v15.1031L12.0079,38z M22.6072,11.6439l-5.5698-5.505H7.0958l-5.703,5.6372v13.8976l10.6144,10.4895l10.6-10.4767V11.6439z M9.6349,12.8178H2.7966l4.8942-4.9479h8.7921l4.8087,4.9479h-6.8403v19.9073l-2.4074,2.405l-2.409-2.405V12.8178z M16.6219,14.1333h4.6433v11.1782l-3.5211,3.5552l-3.2382-3.229v-0.006l2.116-2.0969V14.1333z M7.3813,23.5348l2.2045,2.1019l-3.3285,3.2301l-3.5185-3.5551V14.1331h4.6425V23.5348z'
}));

const WoWsLogo = () => createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '27',
  viewBox: '0 0 1640.42 1819.21'
}, [
  createElement('path', {
    key: 'path1',
    fill: 'currentColor',
    fillRule: 'evenodd',
    d: 'M1230.3,410.1H410.1v830.83L820.21,1410.1l410.1-169.17Zm-69.2,784.62-340.89,140.4-340.89-140.4V479.32H1161.1Z'
  }),
  createElement('polygon', {
    key: 'path2',
    fill: 'currentColor',
    points: '1091.86 1148.35 1091.86 857.98 956.93 913.65 956.93 1057.95 887.7 1086.51 887.7 853.03 922.29 853.03 1022.63 811.65 1022.63 718.09 887.7 718.09 887.7 683.46 953.42 642.16 953.42 548.55 687 548.55 687 642.08 752.77 683.46 752.77 718.09 617.83 718.09 617.83 811.7 718.17 853.03 752.77 853.03 752.77 1086.51 683.49 1057.95 683.49 913.65 548.56 857.97 548.56 1148.37 820.21 1260.35 1091.86 1148.35'
  })
]);

const WoWpLogo = () => createElement('svg', {
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  x: '0px',
  y: '0px',
  width: '24',
  height: '18',
  viewBox: '0 0 57 43',
  xmlSpace: 'preserve'
}, createElement('path', {
  fill: 'currentColor',
  d: 'M18.3065,9.86905l10.1746-1.313l10.2979,1.3418v1.1885l1.6055,0.0096l-0.019-2.3482l-11.9034-1.7541L16.701,8.73815v2.3769l1.558,0.0097L18.3065,9.86905z M32.6896,12.09275v9.7763c0,0-1.045,1.3994-1.805,2.0894c-0.0286-3.738-0.0286-12.067-0.0286-12.067l-2.4035-2.2811l-2.3939,2.2045l-0.0096,12.1628l-1.8905-2.0607l0.0286-9.8721L0,12.09275l4.6075,3.7571l14.8961,0.0096l0.0095,7.9745l3.5719,3.1341l2.9546-2.9712l-0.0475,6.1437l2.527,2.2141l2.3655-2.2332l0.0094-6.1438l3.2301,2.8658l3.3915-3.2491l-0.0666-7.6678h15.0006L57,12.06395L32.6896,12.09275z M7.3246,17.77645l4.6264,4.8402l2.7835-0.0096l-0.019-4.8019L7.3246,17.77645z M39.064,23.83395l-10.5735,10.4089l-10.6114-10.3035l-0.0096-6.0287l-1.292,0.0095l0.0096,6.7572l11.875,11.329l11.8939-11.4153l0.0095-6.7571l-1.2729,0.0096L39.064,23.83395z M42.3035,22.64535l2.7835-0.0095l4.56-4.8786l-7.372,0.0288L42.3035,22.64535z'
}));

const customIcons = {
  WoTLogo,
  WoWsLogo,
  WoWpLogo,
};

export const source = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in customIcons) {
      return createElement(customIcons[icon as keyof typeof customIcons]);
    }
    if (icon && icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
  source: docs.toFumadocsSource(),
});
