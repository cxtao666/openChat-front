import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Menu } from 'antd'
import { MessageFilled, IdcardFilled, VideoCameraFilled, BellFilled } from '@ant-design/icons'
// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function Index() {
    const history = useHistory()
    const tabs = [
        {
            key: 'message',
            title: '聊天',
            icon: <MessageFilled style={{ color: 'white', fontSize: '20px' }} />
        },
        {
            key: 'meeting',
            title: '会议',
            icon: <BellFilled style={{ color: 'white', fontSize: '20px' }} />
        },
        {
            key: 'document',
            title: '文档',
            icon: <VideoCameraFilled style={{ color: 'white', fontSize: '20px' }} />
        },
        {
            key: 'video',
            title: '空间',
            icon: <VideoCameraFilled style={{ color: 'white', fontSize: '20px' }} />
        }
    ]

    const [activeKey, setActiveKey] = useState('index')
    const changeActiveKey = (key: string) => {
        setActiveKey(key)
        switch (key) {
            case 'video':
                window.location.href = `video`
                break
            case 'message':
                window.location.href = `chatApp`
                break
            case 'meeting':
                window.location.href = `meeting`
                break
            case 'document':
                window.location.href = `cloudDoc`
                break
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
            <div>
                <img
                    src={'http://image.myblog-tao.cn/FrbxSVuKO4aVXS3zo_AV0sYB4Pts'}
                    alt=""
                    style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
                <Menu
                    style={{ padding: '0px' }}
                    defaultSelectedKeys={[activeKey === 'index' ? 'message' : activeKey]}
                >
                    {tabs.map((item) => (
                        <div
                            onClick={() => {
                                changeActiveKey(item.key)
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: '50px',
                                justifyContent: 'center',
                                backgroundColor: 'black'
                            }}
                        >
                            {item.icon}
                            <div style={{ cursor: 'pointer', marginLeft: '10px', color: 'white' }}>
                                {item.title}
                            </div>
                        </div>
                    ))}
                </Menu>
            </div>
            <div id="app"></div>
        </div>
    )
}

export default Index
