import React, { Component } from 'react';

import './ApplyContentContainer.scss';

import ApplyContentMenuContainer from './ApplyContentMenuContainer';
import ApplyContentInnerContainer from './ApplyContentInnerContainer';

import {
  getMyExtensionInfo,
  getStayInform,
  getMusicList,
  getGoingoutInform
} from '../../../../lib/applyAPI';
import { getCookie } from '../../../../lib/cookie';

export default class ApplyContentContainer extends Component {
  state = {
    contentInfo: {
      extension: {
        title: '연장신청',
        menuTitle: '위치선택',
        menuList: [
          { content: '가', detail: '가온실', val: 0 },
          { content: '나', detail: '나온실', val: 1 },
          { content: '다', detail: '다온실', val: 2 },
          { content: '라', detail: '라온실', val: 3 },
          { content: '2층', detail: '2층 여자 독서실', val: 4 },
          { content: '3층', detail: '3층 학교측 독서실', val: 5 },
          { content: '3층', detail: '3층 기숙사측 독서실', val: 6 },
          { content: '4층', detail: '4층 학교측 독서실', val: 7 },
          { content: '4층', detail: '4층 기숙사측 독서실', val: 8 },
          { content: '5층', detail: '5층 열린 교실', val: 9 }
        ],
        typeList: [{ content: '11시', val: 11 }, { content: '12시', val: 12 }]
      },
      goingout: {
        title: '외출신청',
        menuTitle: '외출목록',
        menuList: [],
        typeList: []
      },
      music: {
        title: '기상음악',
        menuTitle: '요일선택',
        menuList: [
          { content: '월', detail: '신청가능', val: 'mon', available: true },
          { content: '화', detail: '신청가능', val: 'tue', available: true },
          { content: '수', detail: '신청가능', val: 'wed', available: true },
          { content: '목', detail: '신청가능', val: 'thu', available: true },
          { content: '금', detail: '신청가능', val: 'fri', available: true },
          { content: '리', detail: '기상음악 리스트' }
        ],
        typeList: []
      },
      stay: {
        title: '잔류신청',
        menuTitle: '신청목록',
        menuList: [
          { content: '금', detail: '금요귀가', val: 0 },
          { content: '토', detail: '토요귀가', val: 1 },
          { content: '토', detail: '토요귀사', val: 2 },
          { content: '잔류', detail: '잔류', val: 3 }
        ],
        typeList: []
      }
    },
    selectedMenu: 0,
    selectedType: {
      extension: 11,
      goingout: 'sat'
    },
    selectedSeat: '',
    musicApplication: {
      singer: '',
      title: ''
    },
    goingoutApplication: {
      year: '',
      month: '',
      day: '',
      outHour: '',
      outMin: '',
      returnHour: '',
      returnMin: '',
      reason: ''
    },
    extensionInfo: ['', ''],
    stayInfo: '',
    musicInfo: {}
  };

  setExtensionInfo = async () => {
    try {
      const response1 = await getMyExtensionInfo(getCookie('JWT'), 11);
      const response2 = await getMyExtensionInfo(getCookie('JWT'), 12);
      this.setState({
        extensionInfo: [
          this.getRoomName(response1.data.classNum),
          this.getRoomName(response2.data.classNum)
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };

  setStayInfo = async () => {
    try {
      const response = await getStayInform(getCookie('JWT'));
      this.setState({
        stayInfo: this.getStayType(response.data.value)
      });
    } catch (e) {
      console.log(e);
    }
  };

  setMusicInfo = async () => {
    try {
      const response = await getMusicList(getCookie('JWT'));
      this.setState({
        musicInfo: response.data
      });
      let i = 0;
      for (let day in response.data) {
        let isFull = response.data[day].length === 5;
        if (isFull) {
          const menuList = [...this.state.contentInfo.music.menuList];
          menuList[i].detail = '신청불가';
          menuList[i].available = false;
        }

        let isApplied = response.data[day].some(musicInfo => {
          return musicInfo.studentId === getCookie('ID');
        });

        if (isApplied) {
          const menuList = [...this.state.contentInfo.music.menuList];
          menuList[i].detail = '신청완료';
          this.setState({
            contentInfo: {
              ...this.state.contentInfo,
              music: {
                ...this.state.contentInfo.music,
                menuList: [...menuList]
              }
            }
          });
        }
        i++;
      }
    } catch (e) {
      console.log(e);
    }
  };

  setGoingoutInfo = async () => {
    try {
      const response = await getGoingoutInform(getCookie('JWT'));
      let content = [];
      for (let day in response.data) {
        const contentList = response.data[day].map(content => {
          return {
            content: this.getDayType(day),
            detail: this.convertGoingoutInfotoContent(content),
            val: content.id
          };
        });
        content = [...content, ...contentList];
      }
      this.setState({
        contentInfo: {
          ...this.state.contentInfo,
          goingout: {
            ...this.state.contentInfo.goingout,
            menuList: content
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  getRoomName(roomNum) {
    switch (roomNum) {
      case 1:
        return '가온실';
      case 2:
        return '나온실';
      case 3:
        return '다온실';
      case 4:
        return '라온실';
      case 5:
        return '2층';
      case 6:
      case 7:
        return '3층';
      case 8:
      case 9:
        return '4층';
      case 10:
        return '5층';
      default:
        return '-';
    }
  }

  getStayType(stayNum) {
    switch (stayNum) {
      case 1:
        return '금요귀가';
      case 2:
        return '토요귀가';
      case 3:
        return '토요귀사';
      case 4:
        return '잔류';
      default:
    }
  }

  getDayType(day) {
    switch (day) {
      case 'mon':
        return '월';
      case 'tue':
        return '화';
      case 'wed':
        return '수';
      case 'thu':
        return '목';
      case 'fri':
        return '금';
      case 'sat':
      case 'saturday':
        return '토';
      case 'sun':
      case 'sunday':
        return '일';
      case 'workday':
        return '평일';
      default:
    }
  }

  convertGoingoutInfotoContent = info => {
    return `${this.convertDemical(info.go_out_date.substr(5, 2))}일 \
    ${info.go_out_date.substr(11)} \
    ~ ${info.return_date.substr(11)}`;
  };

  convertDemical = numStr => {
    if (numStr[0] === '0') {
      return numStr[1];
    }
    return numStr;
  };

  onSelectMenu = menuVal => {
    this.setState({
      selectedMenu: menuVal
    });
  };

  onSelectType = typeVal => {
    const { type } = this.props;
    this.setState({
      selectedType: {
        ...this.state.selectedType,
        [type]: typeVal
      }
    });
  };
  onChangeMusicApplication = e => {
    this.setState({
      musicApplication: {
        ...this.state.musicApplication,
        [e.target.name]: e.target.value
      }
    });
  };

  onSelectSeat = seat => {
    this.setState({
      selectedSeat: seat
    });
  };

  clearSeat = () => {
    this.setState({
      selectedSeat: ''
    })
  }

  onChangeGoingoutApplication = e => {
    let value;
    if (!isNaN(parseInt(e.target.value))) value = parseInt(e.target.value, 10);
    else value = 0;
    switch (e.target.name) {
      case 'month':
        if (value < 0 || value > 12) return;
        break;
      case 'day':
        if (value < 0 || value > 31) return;
        break;
      case 'outHour':
      case 'returnHour':
        if (value < 0 || value > 24) return;
        break;
      case 'outMin':
      case 'returnMin':
        if (value < 0 || value > 59) return;
        break;
      case 'reason':
        value = e.target.value;
        break;
      default:
    }
    this.setState({
      goingoutApplication: {
        ...this.state.goingoutApplication,
        [e.target.name]: value
      }
    });
  };

  getYear = () => {
    let date = new Date();
    return date.getFullYear();
  };

  componentDidMount() {
    this.setExtensionInfo();
    this.setStayInfo();
    this.setMusicInfo();
    this.setGoingoutInfo();
    this.setState({
      goingoutApplication: {
        ...this.state.goingoutApplication,
        year: this.getYear()
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshFlag) {
      this.setExtensionInfo();
      this.setStayInfo();
      this.setMusicInfo();
      this.setGoingoutInfo();
      this.props.afterRefresh();
    }
  }

  render() {
    const { type, menuList, typeList, onCancel, onApply } = this.props;
    const {
      contentInfo,
      selectedType,
      extensionInfo,
      stayInfo,
      selectedMenu,
      musicApplication,
      musicInfo,
      goingoutApplication,
      selectedSeat
    } = this.state;
    const applyTag = {
      extension: (
        <div className='apply--content--tag--wrapper'>
          <div className='apply--content--tag'>{extensionInfo[0]}</div>
          <div className='apply--content--tag second'>{extensionInfo[1]}</div>
        </div>
      ),
      stay: (
        <div className='apply--content--tag--wrapper'>
          <div className='apply--content--tag'>{stayInfo}</div>
        </div>
      )
    };
    const params = {
      extension: {
        apply: {
          time: selectedType.extension,
          class: selectedMenu,
          seat: selectedSeat
        },
        cancel: selectedType
      },
      goingout: {
        apply: '',
        cancel: selectedMenu
      },
      stay: {
        apply: selectedMenu,
        cancel: selectedMenu
      },
      music: {
        apply: selectedMenu,
        cancel: selectedMenu
      }
    };
    return (
      <div className='apply--content--outer--wrapper'>
        <div className='apply--content--wrapper'>
          <div className='apply--content--left'>
            <div className='apply--content--title--wrapper'>
              <span className='apply--content--title'>
                {contentInfo[type].title}
              </span>
              {applyTag[type]}
            </div>
            <ApplyContentMenuContainer
              menuTitle={contentInfo[type].menuTitle}
              menuList={contentInfo[type].menuList}
              selectedMenu={selectedMenu}
              onSelectMenu={this.onSelectMenu}
            />
          </div>
          <div className='apply--content--right'>
            <ApplyContentInnerContainer
              applyType={type}
              typeList={contentInfo[type].typeList}
              selectedType={selectedType[type]}
              onSelectType={this.onSelectType}
              selectedMenu={selectedMenu}
              onCancel={onCancel}
              onApply={onApply}
              params={params[type]}
              musicApplication={musicApplication}
              onChangeMusicApplication={this.onChangeMusicApplication}
              musicInfo={musicInfo}
              onSelectSeat={this.onSelectSeat}
              selectedSeat={selectedSeat}
              clearSeat={this.clearSeat}
              onChangeGoingoutApplication={this.onChangeGoingoutApplication}
              goingoutApplication={goingoutApplication}
            />
          </div>
        </div>
      </div>
    );
  }
}