const fs = require('fs');

const REPOSITORY = '/Users/beeworks/案件/シノケン/files-after-cleaning/files-com-prod/www/htdocs';
const domain = 'https://www.shinoken.com'
const FILES = [
"/3pointlp_1/assets/images/kv/man.png",
"/3pointlp_2/assets/images/kv/man.png",
"/3pointlp/assets/images/kv/man.png",
"/advicelp/images/keyvis.png",
"/apakeilp/images/base_main.png",
"/articlelp2/img/fv_01_v2.jpg",
"/cancerlp/common/img/mainvis_img.jpg",
"/cmlpb/common/images/page/headimg.jpg",
"/cmlpb/common/images/page/shino.gif",
"/common/img/bnr/cm_banner_20170104.jpg",
"/common/img/bnr/cm_banner.jpg",
"/common/img/bnr/cm_banner.jpg_20170403",
"/common/img/bnr/side_china_20170118.jpg",
"/common/img/bnr/side_china.jpg",
"/common/img/movie/mmb_media.jpg",
"/common/img/side/movie/media_05.jpg",
"/common/img/side/movie/mediaTop.jpg",
"/internal_ad/_old20180222/mov00/come.mp4",
"/internal_ad/_old20180222/mov01/movie01.mp4",
"/internal_ad/_old20180222/mov02/movie02.mp4",
"/internal_ad/mov00/making.mp4",
"/internal_ad/mov01/movie01.mp4",
"/internal_ad/mov02/movie02.mp4",
"/internal_ad/mov03/movie03.mp4",
"/internal_movie/01/mov/mov01.mp4",
"/internal_movie/02/mov/mov02.mp4",
"/internal_movie/03/mov/mov03.mp4",
"/internal_movie/04/mov/mov04.mp4",
"/internal_movie/05/mov/mov05.mp4",
"/mangalp/common/images/cm_img_100_2.jpg",
"/mangalp/common/images/cm_img_100_2.jpg",
"/mangalp/common/images/cm_img_100_2.jpg",
"/mangalp/common/images/cm_img_100_2.jpg",
"/seminarlp_hedge/assets/images/kv/man.png",
"/seminarlp_hedge/assets/images/kv/man.png",
"/seminarlp_net/assets/images/kv/man.png",
"/seminarlp/assets/images/kv/man.png",
"/simulatorlp/common/images/page/headimg.jpg",
"/sp/advicelp/img/keyvis.png",
"/sp/images/recbn_cm.jpg",
"/sp/simulatorlp/images/page/headimg.jpg",
"/sp/toushilp/img/cm_img_100_2.jpg",
"/sp/toushilp/img/cm_img_100_2.jpg",
"/sp/toushilp/img/cm_img_100.jpg",
"/sp/toushilp/img/cm_img_100.jpg",
"/toushilp/img/cm_img_100_2.jpg",
"/toushilp/img/cm_img_100.jpg",
"/toushilp/img/cm_img_100.jpg",
];

(async () => {

  // jsonをcsvに変換する関数
  const json2csv = (json) => {
    var header = Object.keys(json[0]).join(',') + "\n";

    var body = json.map(function (d) {
      return Object.keys(d).map(function (key) {
        return d[key];
      }).join(',');
    }).join("\n");

    return header + body;
  }

  // データの書き出し
  const writeData = async (csvRawData) => {
    await fs.writeFile(`${domain.replace(/https?:\/\//g, '').replace(/\./g, '_')}-file-exists.csv`, json2csv(csvRawData), (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('write end')
      }
    });
  }

  // メインの処理
  const mainFunc = async () => {
    const csvRawData = []
    try {
      for (const file of FILES) {
        let isExist

        if (file.slice(-1) === '/') {
          isExist = (fs.existsSync(`${REPOSITORY}${file}index.html`) || fs.existsSync(`${REPOSITORY}${file}index.php`))
        } else {
          console.log(`${REPOSITORY}${file}`)
          isExist = fs.existsSync(`${REPOSITORY}${file}`)
        }

        const thisPushData = {
          path: `${domain}${file}`,
          exist: isExist,
        }
        csvRawData.push(thisPushData)
      }
    } catch (error) {
      console.log(error);
    }

    await writeData(csvRawData)
  }
  mainFunc()

})();
