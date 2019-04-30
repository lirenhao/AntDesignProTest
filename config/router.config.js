export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: 'productSys/productManager' },
      // infraSys
      {
        name: 'infraSys',
        icon: 'contacts',
        path: '/infraSys',
        routes: [
          {
            name: 'statusType',
            path: '/infraSys/statusType',
            component: './InfraSys/StatusType',
          },
          {
            name: 'statusItem',
            path: '/infraSys/statusItem',
            component: './InfraSys/StatusItem',
          },
          {
            name: 'uomType',
            path: '/infraSys/uomType',
            component: './InfraSys/UomType',
          },
          {
            name: 'uom',
            path: '/infraSys/uom',
            component: './InfraSys/Uom',
          },
          {
            name: 'dataSourceType',
            path: '/infraSys/dataSourceType',
            component: './InfraSys/DataSourceType',
          },
          {
            name: 'dataSource',
            path: '/infraSys/dataSource',
            component: './InfraSys/DataSource',
          },
          {
            name: 'quantityBreakType',
            path: '/infraSys/quantityBreakType',
            component: './InfraSys/QuantityBreakType',
          },
          {
            name: 'quantityBreak',
            path: '/infraSys/quantityBreak',
            component: './InfraSys/QuantityBreak',
          },
          {
            name: 'rateType',
            path: '/infraSys/rateType',
            component: './InfraSys/RateType',
          },
          {
            name: 'deliverableType',
            path: '/infraSys/deliverableType',
            component: './InfraSys/DeliverableType',
          },
          {
            name: 'deliverable',
            path: '/infraSys/deliverable',
            component: './InfraSys/Deliverable',
          },
          {
            name: 'emplPositionType',
            path: '/infraSys/emplPositionType',
            component: './InfraSys/EmplPositionType',
          },
          {
            name: 'emplPosition',
            path: '/infraSys/emplPosition',
            component: './InfraSys/EmplPosition',
          },
          {
            name: 'responsibilityType',
            path: '/infraSys/responsibilityType',
            component: './InfraSys/ResponsibilityType',
          },
          {
            name: 'validResponsibility',
            path: '/infraSys/validResponsibility',
            component: './InfraSys/ValidResponsibility',
          },
          {
            name: 'contentPurposeType',
            path: '/infraSys/contentPurposeType',
            component: './InfraSys/ContentPurposeType',
          },
          {
            name: 'dataResourceType',
            path: '/infraSys/dataResourceType',
            component: './InfraSys/DataResourceType',
          },
          {
            name: 'mimeType',
            path: '/infraSys/mimeType',
            component: './InfraSys/MimeType',
          },
          {
            name: 'periodType',
            path: '/infraSys/periodType',
            component: './InfraSys/PeriodType',
          },
          {
            name: 'priorityType',
            path: '/infraSys/priorityType',
            component: './InfraSys/PriorityType',
          },
          {
            name: 'ratingType',
            path: '/infraSys/ratingType',
            component: './InfraSys/RatingType',
          },
          {
            name: 'requirementType',
            path: '/infraSys/requirementType',
            component: './InfraSys/RequirementType',
          },
          {
            name: 'saleType',
            path: '/infraSys/saleType',
            component: './InfraSys/SaleType',
          },
          {
            name: 'skillType',
            path: '/infraSys/skillType',
            component: './InfraSys/SkillType',
          },
        ],
      },
      // productSys
      {
        name: 'productSys',
        icon: 'contacts',
        path: '/productSys',
        routes: [
          {
            name: 'productType',
            path: '/productSys/productType',
            component: './Template/Tree',
          },
          {
            name: 'productAssocType',
            path: '/productSys/productAssocType',
            component: './Template/Tree',
          },
          {
            name: 'productCategoryType',
            path: '/productSys/productCategoryType',
            component: './Template/Tree',
          },
          {
            name: 'productFeatureType',
            path: '/productSys/productFeatureType',
            component: './Template/Tree',
          },
          {
            name: 'productFeatureIactnType',
            path: '/productSys/productFeatureIactnType',
            component: './Template/Tree',
          },
          {
            name: 'productFeatureApplType',
            path: '/productSys/productFeatureApplType',
            component: './Template/Tree',
          },
          {
            name: 'productPriceType',
            path: '/productSys/productPriceType',
            component: './Template/Table',
          },
          {
            name: 'productPricePurpose',
            path: '/productSys/productPricePurpose',
            component: './Template/Table',
          },
          {
            name: 'productCategory',
            path: '/productSys/productCategory',
            component: './ProductSys/ProductCategory',
          },
          {
            name: 'product',
            path: '/productSys/product',
            component: './ProductSys/Product',
          },
          {
            name: 'productAssoc',
            path: '/productSys/productAssoc',
            component: './ProductSys/ProductAssoc',
          },
          {
            name: 'productFeature',
            path: '/productSys/productFeature',
            component: './ProductSys/ProductFeature',
          },
          {
            name: 'productPrice',
            path: '/productSys/productPrice',
            component: './ProductSys/ProductPrice',
          },
          {
            name: 'productManager',
            path: '/productSys/productManager',
            component: './ProductSys/ProductManager',
          },
        ],
      },
      // partySys
      {
        name: 'partySys',
        icon: 'contacts',
        path: '/partySys',
        routes: [
          {
            name: 'partyType',
            path: '/partySys/partyType',
            component: './PartySys/PartyType',
          },
          {
            name: 'partyIdentificationType',
            path: '/partySys/partyIdentificationType',
            component: './PartySys/PartyIdentificationType',
          },
          {
            name: 'businessLicenceApprovalType',
            path: '/partySys/businessLicenceApprovalType',
            component: './PartySys/BusinessLicenceApprovalType',
          },
          {
            name: 'partyCategoryType',
            path: '/partySys/partyCategoryType',
            component: './PartySys/PartyCategoryType',
          },
          {
            name: 'roleType',
            path: '/partySys/roleType',
            component: './PartySys/RoleType',
          },
          {
            name: 'partyRelationshipType',
            path: '/partySys/partyRelationshipType',
            component: './PartySys/PartyRelationshipType',
          },
          {
            name: 'contactMechType',
            path: '/partySys/contactMechType',
            component: './PartySys/ContactMechType',
          },
          {
            name: 'contactMechPurposeType',
            path: '/partySys/contactMechPurposeType',
            component: './PartySys/ContactMechPurposeType',
          },
          {
            name: 'communicationEventType',
            path: '/partySys/communicationEventType',
            component: './PartySys/CommunicationEventType',
          },
          {
            name: 'communicationEventPrpType',
            path: '/partySys/communicationEventPrpType',
            component: './PartySys/CommunicationEventPrpType',
          },
          {
            name: 'partyPerson',
            path: '/partySys/partyPerson',
            component: './PartySys/PartyPerson',
          },
          {
            name: 'groupManager',
            path: '/partySys/groupManager',
            component: './PartySys/GroupManager',
          },
        ],
      },
      // test
      {
        name: 'test',
        icon: 'contacts',
        path: '/test',
        routes: [
          {
            name: 'clue',
            path: '/test/clue',
            component: './Test/Clue',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/test/clue',
                component: './Test/Clue/List',
              },
              {
                name: 'sign',
                path: '/test/clue/sign',
                component: './Test/Clue/Sign',
              },
            ],
          },
        ],
      },
      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       name: 'basic',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
