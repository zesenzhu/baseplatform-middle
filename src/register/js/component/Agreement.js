import React from "react";
import { connect } from "react-redux";
import { CheckBox, CheckBoxGroup, Tips, DropDown } from "../../../common";
import { Input } from "antd";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import "../../scss/Agreement.scss";
import { Scrollbars } from "react-custom-scrollbars";

 class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
  }

  render() {
    const { LoginUser, DataState, UIState } = this.props;
    return (
      <div  className="Agreement" id='Agreement'>
        <Scrollbars style={{ width: "100%" }}>
        <p></p>
        <p style={{textAlign:"center",lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              用户注册协议
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            蓝鸽公司（以下统称&quot;我们&quot;）非常重视用户的隐私和个人信息保护。您在使用我们的产品和服务时，我们可能会收集和使用您的相关信息。我们希望通过本《用户注册协议》（以下简称&quot;本政策&quot;）向您说明在您接受我们的产品服务时，我们如何收集、使用、储存、共享和转让这些信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            请在使用我们的服务前，仔细阅读并了解本政策。如果您不同意本政策的内容，将导致我们无法为您提供完整的服务，同时也请您立即停止使用我们的产品和服务。您使用或继续使用我们提供的产品和/或服务，则表示您同意我们按照本政策收集、使用、储存和分享、披露、保护您的个人信息。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#0066FF'}}>
            本《用户注册协议》将帮助您了解以下内容：
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            1.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            本政策适用范围、相关词语涵义
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            2.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们如何收集、存储和使用您的个人信息
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            3.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们如何使用Cookie
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            4.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们如何共享、转让、公开披露您的个人信息
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            5.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们如何保护您的个人信息
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            6.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您的权利
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            7.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们如何处理未成年人的个人信息
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            8.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            本政策如何更新
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            9.
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            如何联系我们
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              1.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              本政策适用范围、相关词语涵义
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              1.1
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              本政策适用范围
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            当您使用我们的任何产品和服务时，本政策即适用，无论该产品和服务是否单独设置了隐私条款，也无论您是浏览用户（访客）还是注册登录用户。请您注意，本政策不适用于以下情况：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:10+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ●
            <span style={{font:"9px  "}}>
              &nbsp;&nbsp;{" "}
            </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            接入我们服务的第三方服务（包括任何第三方网站）所收集的信息；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              1.2
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              相关词语涵义
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              个人信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指以电子或者其它方式记录的能够单独或者与其它信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。例如在您使用我们的服务时，我们可能会收集您的如下个人信息，包括网络身份识别信息（如账号、邮箱地址以及与前述有关的密码、密码保护问题和答案）、联系电话、个人上网记录（网络浏览记录、点击记录等）等。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              个人敏感信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，包括个人身份信息、通讯记录和内容、不满14
            周岁未成年的个人信息等。您同意您的个人敏感信息按本政策所述的目的和方式来处理。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              共享信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指您在我们的服务中自愿与您的社交网络及使用该服务的所有用户公开分享的有关您的信息，或其它方分享的与您有关的信息，例如，他们上传或发布的信息中包含有关您的信息，以及他们发送给您和其它使用我们服务的用户通讯信息之中包含的有关您的信息。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              非个人身份信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指任何与您有关但实际上不可直接或间接辨认您身份的信息，包括以汇集、匿名或化名方式提供的个人信息。您知悉并同意，无法识别出您的个人身份的信息不属于个人信息。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#7F7F7F'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              2.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              我们如何收集、存储和使用您的个人信息
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              2.1
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              我们收集的信息
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              1
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              ）您提供的信息
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●
            </span>
          </strong>
          <strong> </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              注册
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            创建账号时，您需要提供包括学号、姓名、班级以及密码等在内的数据。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ● &nbsp;
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              登录
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            您登录个人账号后，可以进入&quot;个人账号设置&quot;自行设置、修改或完善相关个人信息，具体包括：快捷用户名、微信号码、QQ号码、微博号码、联系电话、个性签名等。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ● &nbsp;
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              售后
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            您在使用我们的客服、产品或服务的售后功能时，主动向我们提供的账户相关信息；您知悉，上传您的个人信息（特别是个人敏感信息）或发布、储存相关信息并非您的义务，但如您拒绝提供，可能会限制我们为您提供更多的服务。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              2
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              ）其他方分享的您的信息
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            当您使用我们的关联公司、合作伙伴的服务时，他们在您的授权下可能向我们分享您的相关信息；
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            若您以其它方式关联登录、使用我们的服务，我们会向第三方请求您的个人信息，对于我们需要但第三方无法提供的个人信息，我们仍会要求您提供。如果您拒绝提供，将可能导致您无法正常使用我们服务的某些功能。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们将会依据与第三方的约定、对个人信息来源的合法性进行确认后，在符合相关法律法规规定的前提下，使用从第三方获得的您的个人信息。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              3
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              ）我们自动获取的您的信息
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您使用我们的服务时我们可能会收集如下信息：
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              日志信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指您使用我们的服务时，系统可能会通过cookies或其它方式自动采集的信息，包括：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            设备或软件信息，例如您的移动设备、网页浏览器或您用于接入我们的服务的其它程序所提供的配置信息、您的IP地址和您的移动设备所用的版本和设备识别码；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您在使用我们服务时搜索和浏览的信息，例如您使用的网页搜索词语、访问的第三方页面url地址，以及您在使用我们服务时浏览或要求提供的其它信息和内容详情；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            有关您曾使用的移动应用（APP）和其它软件的信息，以及您曾经使用该等移动应用和软件的信息；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您通过我们的服务进行通讯的信息，例如曾通讯的账号，以及通讯时间、数据和时长；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您通过我们的服务分享的内容所包含的信息（元数据），例如拍摄或上传的共享照片或录像的日期、时间或地点等。
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            网络信息，例如使用的移动网络运营商网络数据信息、WIFI信号信息、宽带数据信息等。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ● &nbsp;
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              位置信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指您开启设备定位功能并使用我们基于位置提供的相关服务时，我们收集的有关您位置的信息，包括：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您通过具有定位功能的移动设备使用我们的服务时，我们通过GPS或WiFi等方式收集的您的地理位置信息；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您可以通过关闭定位功能随时停止我们对您的地理位置信息的收集。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              录音、录像、照片信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            指您使用我们的特定功能（例如语音留言、扫码、拍照等）时，在获得您的授权后，我们收集的信息。拒绝提供该信息仅会使您无法使用上述功能，但不影响您正常使用我们的服务的其它功能。此外，您可随时关闭相关功能。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              其它：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们希望提供给您的服务是完善的，所以我们会不断改进我们的服务和相关技术。这意味着我们的服务可能会经常推出新功能，可能需要收集新的信息。如果我们收集的个人数据或使用方式出现重大变化或调整，我们会通过适当的方式通知您并且可能会修订本政策。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              2.2
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              个人信息的存储
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              1
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              ）存储地点
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们依照法律法规的规定，将您的个人信息存储于中华人民共和国境内（包含港澳台）。如需跨境存储，我们会单独再征得您的授权同意；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              2
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              ）存储期限
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            除法律或相关法规另有约定外，我们在为提供我们的服务之目的所必需的期间内保留您的个人信息，但您要求我们立即删除或注销账户的、或法律法规另有规定的除外。对于已匿名化的信息的存储期限和处理，我们无需取得您的授权同意，也无需进行通知。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              3
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              ）我们如何使用您的信息
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            用于数据分析，以便向您提供更加优质的服务；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            帮助我们设计新服务，改善我们现有服务；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他使用我们服务的用户作出其它方面的回应；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            让您参与有关我们产品和服务或通过我们的产品和服务发起的调查，是否参与调查将由您全权决定，并且由您自行选择提供哪些信息；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            出于安全、合法调查等目的；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们可能使用您的数据做数据汇总、分析、挖掘（包括商业化利用），但这些信息都采用匿名的方式，不能识别您的身份。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            为了让我们的用户有更好的体验、改善我们的服务或您同意的其它用途，在符合相关法律法规的前提下，我们可能将通过我们的某一项服务所收集的个人信息，以汇集信息或者个性化的方式，用于我们的其它服务。例如，在您使用我们的一项服务时所收集的您的个人信息，可能在另一服务中用于向您提供特定内容或向您展示与您相关的、而非普遍推送的信息。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            请您注意，除非您删除或撤回同意（即通过系统设置拒绝我们的收集和使用），您在使用我们的服务时所提供的所有个人信息，将在您使用我们的服务期间持续授权我们在符合本政策的范围内使用。在您注销账号后，我们将根据您的要求删除您的个人信息，或做匿名化处理，但法律法规另有规定的除外。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              3.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              我们如何使用Cookie
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            为确保网站正常运转，我们会在您的计算机或移动设备上存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的偏好、账号基本信息等数据。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们不会将Cookie用于本政策所述目的之外的任何用途。您可根据自己的偏好管理或删除
            Cookie。您可以清除计算机上保存的所有Cookie，大部分网络浏览器都设有阻止Cookie的功能。但如果您这么做，则在每一次访问我们的网站时都需亲自更改系统设置，并可能导致部分借助Cookie的功能无法正常使用。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              4.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              我们如何共享、转让、公开披露您的个人信息
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              4.1{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              共享
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            您同意，我们可能与我们的关联公司分享您必要的个人信息，以提供和发展我们的产品和服务。除以下情形外，未经您同意，我们以及我们的关联公司不会与任何第三方分享您的个人信息：
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们以及我们的关联公司可能将您的个人信息与我们的关联公司、合作伙伴及第三方服务供应商、承包商及代理（例如代表我们发出电子邮件或推送通知的通讯服务提供商、以及为我们提供位置数据的地图服务供应商）分享，用作下列用途：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            向您提供我们的服务；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            实现&quot;我们如何使用您的信息&quot;部分所述目的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            履行我们在《用户服务条款》或本《用户注册协议》中的义务和行使我们的权利；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            理解、维护和改善我们的服务。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            如果我们与任何上述第三方分享您的个人信息，我们将努力确保该等第三方在使用您的个人信息时遵守本政策及我们要求其遵守的其它适当的保密和安全措施，我们会对其数据安全能力与环境进行调查，与其签署严格的保密协定，并只会分享特定用途所必要的个人信息。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            随着我们业务的持续发展，我们有可能进行合并、收购、资产转让或类似的交易，而您的个人信息有可能作为此类交易的一部分而被转移，我们会要求新持有人继续遵守该政策，否则我们将要求其重新获取您的授权。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们还可能为以下需要保留、保存或披露您的个人信息：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            事先已获得您的授权同意或符合您签署的其它文件（如本政策）的约定；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            遵守适用的法律法规；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            遵守法院命令或其它法律程序的规定；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            遵守相关政府机关的要求；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            与国家安全、国防安全、公共安全、公共卫生、公共利益直接相关的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们认为为遵守适用的法律法规、维护社会公共利益、或保护我们、我们的客户、其他用户或雇员的人身和财产安全或合法权益所合理必需的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            法律法规规定的其它情形。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              4.2
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              转让
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            在获取明确同意的情况下转让：获得您的明确同意后，我们会向其它方转让您的个人信息；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              4.3
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              公开披露
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们仅会在以下情况下，公开披露您的个人信息：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            获得您明确同意后；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              5.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              我们如何保护您的个人信息
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们非常重视信息安全，我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如SHA）来保护您向我们提供的个人信息。但请您谅解，由于技术的限制以及风险防范的局限，即便我们已经尽量加强安全措施，也无法始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的情况而发生问题。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们成立了专门的团队负责研发和应用多种安全技术和程序等，我们会对安全管理负责人和关键安全岗位的人员进行安全考核，我们建立了完善的信息安全管理制度和内部安全事件处置机制等，我们会采取适当的符合业界标准的安全措施和技术手段存储和保护您的个人信息，以防止信息丢失、毁损、泄漏或未经授权的访问和使用。根据我们的安全管理制度，个人信息泄露、毁损或丢失事件被列为重大安全事件，一经发生将启动公司紧急预案，由网络运营部、信息管理部、客户服务部、法务部等多个部门组成联合应急响应小组处理；
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们会对员工进行数据安全的意识培养和安全能力的培训和考核，会对处理个人信息的员工进行身份认证及权限控制，并会与接触您个人信息的员工、合作伙伴签署保密协议，明确岗位职责及行为准则，若有违反保密协议的行为，会被立即终止与我们的劳动或合作关系，并会被追究相关法律责任，对接触个人信息人员在离岗时也提出了保密要求。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们会及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们也请您理解，由于技术的限制和飞速发展以及可能存在的各种恶意攻击手段，即便本单位竭尽所能加强安全措施，也不可能始终保证信息的百分之百安全。因此，我们强烈建议您采取积极措施保护个人信息的安全，包括但不限于使用复杂密码、定期修改密码、不将自己的账号密码等个人信息透露给他人。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              6.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              您的权利
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.1{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              访问权
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            原则上您可以通过如下方式访问您的个人信息：
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
              账号信息：
            </span>
          </strong>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您可以随时登录您的个人账号，访问或编辑您账号中的个人资料信息、更改您的密码、添加安全信息、进行账号关联或身份认证等；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
              使用信息：
            </span>
          </strong>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您可以在我们的网站、客户端等服务中查阅历史搜索记录、历史聊天记录等信息，您也可通过本政策文末提供的方式联系我们删除这些信息，我们将在核实您的身份后提供，但法律法规另有约定的除外；
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:7+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              ●
            </span>
          </strong>
          <strong> </strong>
          <strong>
            <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
              其它信息：
            </span>
          </strong>
          <span style={{fontSize:16+'px',lineHeight: '150%',fontFamily:'宋体',color:'#404040'}}>
            如果您在系统访问过程中遇到操作问题的或如需获取其它前述无法获知的个人信息内容，您可通过本政策文末提供的方式联系我们，我们将在核实您的身份后提供，但法律法规另有约定的除外。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.2{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              更正权
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            经对您的身份进行验证，且更正不影响信息的客观性和准确性的情况下，您有权对错误或不完整的信息进行更正或更新，您可以自行在我们的网站或客户端中进行更正，或在特定情况下，尤其是数据错误时，通过本政策文末提供的联系方式将您的更正申请提交给我们，要求我们更正或更新您的数据，但法律法规另有规定的除外。但出于安全性和身份识别的考虑，您可能无法修改注册时提交的某些初始注册信息。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.3{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              删除权
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            您可以通过本政策文末提供的联系方式向我们提出删除您个人信息的请求，例如您不再需要我们继续为您提供服务，但已做数据匿名化处理或法律法规另有规定的除外。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.4{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              索取权
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            如您需要您的个人数据的副本，您可以通过本政策文末提供的方式联系我们，在核实您的身份后，我们将向您提供您在我们的服务中的个人信息副本（例如账号基本资料、身份信息），但法律法规另有规定的除外。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.5{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              撤回同意权
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            如果您想更改相关功能的授权范围（例如位置、通讯录、相机），您可以通过您的硬件设备修改个人设置、或在我们的产品或服务中的相关功能设置界面进行操作处理。如您在此过程中遇到操作问题的，可以通过本政策文末提供的方式联系我们。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            当您取消相关个人信息收集的授权后，我们将不再收集该信息，也无法再为您提供上述与之对应的服务；但您知悉并同意，除非您行使前述&quot;删除权&quot;，否则您的该行为不会影响我们基于您之前的授权进行的个人信息的处理、存储。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.6{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              注销权
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            您可以通过联系我们的客服注销您的账号（但法律法规另有规定的除外），一旦您注销账号，将无法使用我们提供的全线用户产品的服务，因此请您谨慎操作。除法律法规另有规定外，注销账号之后，您该账户内的所有信息将被清空，并根据您的要求删除您的个人信息。您通过第三方账号（如微信、微博、QQ等）授权登录我们的服务时，需要向第三方申请注销账号。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.7{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              提前获知产品和服务停止运营权
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们愿一直陪伴您，若因特殊原因导致我们部分或全部产品和服务被迫停止运营，我们将提前15日在产品或服务的主页面或站内信或向您发送电子邮件或其它合适的能触达您的方式通知您，并将停止对您个人信息的收集，同时会按照法律规定对所持有的您的个人信息进行删除或匿名化处理等，法律法规另有规定的除外。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              6.8{" "}
            </span>
          </strong>
          <strong>
            <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
              例外情形
            </span>
          </strong>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            在以下情形中，按照法律法规要求，我们将无法响应您的请求：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{marginLeft:28+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            与国家安全、国防安全直接相关的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{marginLeft:28+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            与公共安全、公共卫生、重大公共利益直接相关的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{marginLeft:28+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            与犯罪侦查、起诉、审判和判决执行等直接相关的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{marginLeft:28+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            有充分证据表明您存在主观恶意或滥用权利的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{marginLeft:28+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{marginLeft:28+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            涉及商业秘密的。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              7.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              我们如何处理未成年人的个人信息
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            如果没有父母或监护人的同意，未成年人不得创建自己的用户账户。如您为未满18周岁的未成年人的，请务必请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            如果父母或监护人发现相关未成年人信息为未成年人自行填写，需要进行修改或删除处理的，请通过本政策文末提供的方式联系我们，我们会第一时间予以响应处理。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              8.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              本政策如何更新
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            我们的隐私政策可能会变更。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本政策所做的任何变更。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            对于重大变更，我们还会提供更为显著的通知（包括我们会通过蓝鸽官网公示的方式进行通知甚至向您提供弹窗提示）。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            本政策所指的重大变更包括但不限于：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们的服务模式发生重大变化。如处理个人信息的目的、类型，以及个人信息的使用方式等；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们在所有权结构、组织架构等方面发生重大变化，如业务调整、破产并购等引起的所有者变更等；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            个人信息共享、转让或公开披露的主要对象发生变化；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            您参与个人信息处理方面的权利及其行使方式发生重大变化；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'Wingdings',color:'#404040'}}>
            ☆<span style={{font:"9px  "}}>&nbsp; </span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            个人信息安全影响评估报告表明存在高风险时。
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <span style={{fontSize: 16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            &nbsp;
          </span>
        </p>
        <p style={{lineHeight:1.5}}>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              9.
            </span>
          </strong>
          <strong>
            <span style={{fontSize:19+'px',lineHeight:1.5,fontFamily:'宋体',color:'black'}}>
              如何联系我们
            </span>
          </strong>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            您可以通过以下方式与我们联系，我们将在15个工作日内回复您的请求：
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            （1）<span style={{font:"9px  "}}></span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            如对本政策内容有任何疑问、意见或建议，您可通过
          </span>
          <span style={{lineHeight:1.5,fontFamily:"&#39;微软雅黑&#39;,sans-serif",color:'#0066FF',background:'white'}}>
            lancoo_shenbao@chinalancoo.com
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            与我们联系；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            （2）<span style={{font:"9px  "}}></span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            如发现个人信息可能被泄露，您可以通过
          </span>
          <span style={{lineHeight:1.5,fontFamily:"&#39;微软雅黑&#39;,sans-serif",color:'#0066FF',background:'white'}}>
            lancoo_shenbao@chinalancoo.com
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            投诉举报；
          </span>
        </p>
        <p  className="MsoListParagraph" style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            （3）<span style={{font:"9px  "}}></span>
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            我们还设立了个人信息保护专职部门，您可以通过
          </span>
          <span style={{lineHeight:1.5,fontFamily:"&#39;微软雅黑&#39;,sans-serif",color:'#0066FF',background:'white'}}>
            lancoo_shenbao@chinalancoo.com
          </span>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily:'宋体',color:'#404040'}}>
            与其联系。
          </span>
        </p>
        <p style={{textIndent:32+'px',lineHeight:1.5}}>
          <span style={{fontSize:16+'px',lineHeight:1.5,fontFamily: '宋体',color:'#404040'}}>
            如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，您还可以通过向被告所在地有管辖权的法院提起诉讼来寻求解决方案。
          </span>
        </p>
        <p>
          <br />
        </p>
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(Agreement);
