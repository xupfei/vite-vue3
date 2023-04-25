
import service from "@/utils/axios.js";
export default {
    //房间档案列表
    homeFileList: params => service.get(`/user/households`, { params }),
    //根据手机号查找用户信息
    getInfoByPhone: phone => service.get(`/user/communityUser/query/${phone}`),
    //房间档案新增
    homeFileAdd: params => service.post(`/user/households/save`, params),
    //房间档案详情
    homeFileDetail: (roomId, householdId) => service.get(`/user/households/room/${roomId}/${householdId}`),
    //房间档案详情-编辑
    homeFileEdit: (householdId, params) => service.post(`/user/households/${householdId}/modify`, params),
    //房间档案删除前判断能否删除
    homeFileDelCheck: householdId => service.post(`/user/households/verification/${householdId}/delete`),
    //房间档案删除
    homeFileDel: householdId => service.post(`/user/households/member/${householdId}/delete`),
}