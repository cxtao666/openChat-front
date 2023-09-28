import { Image } from 'antd';
import { QiNiuConfig } from 'util/upload/qiniu';

interface ShowFileProps {
    url:string,
    type:string
}

export const ShowFile = ({url, type}:ShowFileProps) => {
    const fileName = url.split(QiNiuConfig.prefix)[1];
    console.log('类型',type,'地址',url)
  if (type.search("image") !== -1) {
      return <Image width={200} src={url} height={200}></Image>
  }else if(type.search('video') !== -1){
      return <video  width={200} height={200} src={url} controls></video>
  }else if(type.search('audio') !== -1){
        return <audio src={url} controls style={{height:"100px"}}></audio>
  }
  else{
      return <a href={url} download>{fileName.slice(fileName.search('\\.') +1)}</a>
  }
};
