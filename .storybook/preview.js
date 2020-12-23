import { configure, storiesOf} from '@storybook/html';
const path = require('path')
// const pugContext = require.context(resolve(__dirname, '../src/pug/stories/'), true, /\.stories\.pug$/);
const pathStr = 'components/button.stories.pug'
const ext = path.extname(pathStr)
// const dirName = path.dirname(pathStr) !== '.' ? path.dirname(pathStr).replace('./','') : 'Others'
const dirName = 'Others'
// const filePath = path.dirname(pathStr) !== '.' ? `${dirName}/${path.basename(pathStr)}` : path.basename(pathStr)
const filePath = "test"
// const fileName = path.basename(pathStr.replace('.stories',''),`${ext}`)
const fileName = "button"
// const pugSrc = require(`../src/pug/stories/${filePath}`);

const html = require('!html-loader!pug-plain-loader!../src/pug/stories/components/button.pug');
storiesOf( dirName , module)
  .add( fileName , () => {
    return html;
  });
  


// export default {
//   title: `${filePath}`,
//   component: Template,
// };
