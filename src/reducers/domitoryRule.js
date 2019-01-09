import { DOMITORY_RULE_LIST_ADD } from '../actions';

const initialState = {
    list : [
        {
            number: 1,
            title: '우정관 점호 안내',
            author: '사감부',
            content: `1. 외박은 금요일 일과시간 이후(20:30~21:00, 점호 전까지)에 나갈 수 있으며, 토요일에는 아침점호(08:00) 이후에 나갈 수 있습니다.

            2. 외출은 토요일과 일요일에 나갈 수 있으며, 지정된 외출시간은 12:00~17:30 입니다.
              : 시험, 병원, 종교활동 등 오전에 외출해야 할 경우는 먼저 사감선생님에게 보고하여 허락받아야 합니다.
              : 지정시간 외 외출의 경우 목적에 필요한 시간만 외출할 수 있으며, 이후 외출시간에 다시 나갈 수 없습니다.
              : 외출시간은 점심시간 후 ~ 저녁시간 전이므로 급식을 거르지 않도록 합니다.
              : 주말급식 미신청자의 경우 식사외출 1시간을 허용합니다.(오후외출시간에 붙여서 쓸 경우 30분)
            
            3. 외박 희망 시 해당 주말 이전 목요일 22시까지, 외출 희망 시 금요일 22시까지 DMS를 통해 신청합니다.
              : 신청시간 이후에 변경할 경우, 벌점이 부여됩니다.(1점)
            
            4. 외박 시, 귀사 시 항상 사감실에 방문하여 확인서명을 한 후 귀가할 수 있도록 합니다.
            
            5. 외출 시 사감실에 방문하여 외출신청서를 작성 후 소지하고 나가야하며, 복귀 시 사감실에 제출합니다.
            
            6. 외박 후 귀사 시 20:30까지 기숙사에 도착해야 하며, 늦게 될 경우 해당 시간 전에 사감실에 보고(전화)해야 합니다.
              : 지연귀사 사유에 따라 지도교사가 판단, 또는 협의하여 1점 또는 3점으로 벌점을 차등 부여합니다.
              : 천재지변, 사고 등에 의한 지연귀사의 경우 학생이 증거자료(사진 등)를 제출하면 벌점을 부여하지 않습니다.
              : 공식적인 활동을 입증하는 자료를 사전에 제출할 시, 23시까지 지연귀사를 허용합니다.
              : 23시 이전에 귀사가 불가능한 활동의 경우, 다음 날까지 체험학습(평일), 외박(주말)을 신청합니다.
            
            7. 사감실에서는 외박예정문자, 외출예정문자, 외출·복귀 시 확인문자, 귀사 시 확인문자를 학부모님께 전송합니다.
            
            8. 의무귀가(전체 학생 귀가) 이후 귀사일에는 17:30부터 귀사할 수 있습니다.`
        },
        {
            number: 2,
            title: '우정관 외출, 외박(귀가) 규정',
            author: '사감부'
        }
    ]
}


function domitoryrule (state = initialState, action) {
    const { list } = state; 
    switch (action.type) {
        case DOMITORY_RULE_LIST_ADD: 
            return {
                list: [
                    ...list,
                    {
                        number: action.index,
                        title: action.list.title,
                        author: action.list.title
                    }
                ]
            }
        default:
            return state;
    }
}

export default domitoryrule;