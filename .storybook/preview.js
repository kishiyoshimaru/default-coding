import { configure, storiesOf} from '@storybook/html';
import '../src/scss/style.scss';
const path = require('path');
const ext = '.pug';

const storiesList = require.context('html-loader!pug-plain-loader!../src/stories/', true, /\.stories\.pug$/); // 本当はここでloaderを噛ませる必要はないのだが、pugをそのまま読み込むとwarningが出るためloaderを噛ませる

storiesList.keys().forEach(function(storyPath) {
  const dirName = path.dirname(storyPath) !== '.' ? path.dirname(storyPath).replace('./','') : 'Others';
  const filePath = path.dirname(storyPath) !== '.' ? `${dirName}/${path.basename(storyPath)}` : path.basename(storyPath);
  const fileName = path.basename(storyPath.replace('.stories',''),`${ext}`);
  // const pugSrc = require(`../src/stories/${filePath}`);
  const html = require(`html-loader!pug-plain-loader!../src/stories/${filePath}`);

  storiesOf(dirName, module)
    .add(fileName, () => {
      return html;
    });
});
