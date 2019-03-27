import { parse } from 'url'
import moment from 'moment'

let index = 100

const dataSource = {
  // 个人
  partyPerson: {
    "11": {
      partyId: "11",
      firstName:"",
      middleName:"",
      lastName:"",
      personalTitle:"头衔",
      nickName:"昵称",
      genderTypeId: "1",
      birthDate:"",
      maritalStatus:"0",
      defaultPartyIdentificationTypeId: "默认的身份类型标识-身份证",
      totalYearsWorkExperience:"总的工作年限",
      employmentStatusId:"雇佣状态标识",
      residenceStatusId:"居住状态标识",
      description: "个人",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  // 组织
  partyGroup: {
    "21": {
      partyId:"21", 
      parentId: "",
      groupName:"法定组织", 
      comments:"法定组织", 
      logoUrl: "",
    },
    "22": {
      partyId:"22", 
      parentId: "",
      groupName:"非正式组织", 
      comments:"非正式组织", 
      logoUrl: "",
    },
  },
  partyCategoryGroup: {
    "1": {
      partyCategoryGroupId: "1",
      partyCategoryTypeId: "1",
      parentGroupId: "",
      description: "类别组",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  partyCategoryRollup: {
    "1": {
      partyCategoryId: "1",
      parentCategoryId: "",
      fromDate: "2019-03-17",
      thruDate: "2019-03-17",
      sequenceNum: "1",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  partyCategory: {
    "1": {

    },
  }
}

export default {

}