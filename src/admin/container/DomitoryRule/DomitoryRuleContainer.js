import React, { Component, Fragment } from 'react';

import { noticeGet, noticeDelete } from '../../lib/notice'

import DomitoryRule from '../../component/DomitoryRule/DomitoryRule'
import DomitoryRuleList from '../../component/DomitoryRule/DomitoryRuleList'
import Loading from '../../common/Loading/Loading'

import { withRouter } from 'react-router-dom'

class DomitoryRuleContainer extends Component {
    TaskData = async () => {
        try {
            const response = await noticeGet('rule')
            this.HandleAfterRequest(response)
        }
        catch (err) {
            try {
                const response = await noticeGet('rule')
                this.HandleAfterRequest(response)                
            }
            catch (err) {
                alert('로그인이 필요합니다')
                this.props.history.push('/admin/login')
            }
        }
    }

    HandleAfterRequest = (response) => {
        const { ruleList } = response.data
        this.setState({
            ruleList,
            loading : false
        })
    }

    HandleDelete = async (id) => {
        await noticeDelete('rule', id)
        this.TaskData()
    }

    state = {
        ruleList : [],
        loading : true
    }

    componentDidMount() {
        this.TaskData()
    }

    render() {
        const { ruleList, loading } = this.state
        const List = ruleList.reverse().map(data => (
            <DomitoryRuleList HandleDelete = {this.HandleDelete} data = {data} key = {data.ruleId}/>
        ))
        return (
            <Fragment>
                {
                    loading && <Loading />
                }
                <DomitoryRule List = {List}/>
            </Fragment>
        );
    }
}

export default withRouter(DomitoryRuleContainer);