import { parse } from 'url'
import moment from 'moment'

let index = 100

const dataSource = {
  // 个人
  partyPerson: {
    "11": {
      partyId: "11",
      birthDate:"",
      firstName:"",
      middleName:"",
      lastName:"",
      genderTypeId: "性别类型ID",
      defaultPartyIdentificationTypeId: "默认的身份类型标识-身份证",
      maritalStatus:"婚姻状态",
      personalTitle:"默认头衔",
      nickName:"昵称",
      totalYearsWorkExperience:"总的工作年限",
      employmentStatusId:"雇佣状态标识",
      residenceStatusId:"居住状态标识",
      description: "个人",
      externalId:"外部系统标识",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  // 组织
  partyGroup: {
    "21": {
      partyId:"21", 
      groupName:"组织", 
      comments:"组织", 
      logoUrl: "",
    }
  },
  // 公司
  partyGroupCorp: {
    "31": {
      partyId: "31",
      termOfOperationFromDate: "2010-03-25",
      termOfOperationThruDate:"2100-03-25",
      establishmentDate:"2010-03-25",
      registeredCaptial:"注册资本",
      NumberOfInsuredPersons:"参保人数",
    }
  },
}

export default {

}