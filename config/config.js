 /*
  * 설정
  */

 module.exports = {

     server_port: 3000,

     db_url: 'mongodb://localhost:27017/local',

     db_schemas: [{
             file: './user_account_schema',
             collection: 'users_account',
             schemaName: 'user_account_schema',
             modelName: 'user_account_model'
         },

         {
             file: './user_withdrawal_reason_schema',
             collection: 'withdrawal_reason',
             schemaName: 'user_withdrawal_reason_schema',
             modelName: 'user_withdrawal_reason_model'
         }
     ],

     route_info: [{
             file: '../config/config',
             path: '/current_password_confirm_withdrawal',
             method_path: 'current_password_confirm_withdrawal',
             type: 'post'
         },
         {
             file: '../config/config',
             path: '/modify_password_post',
             method_path: 'modify_password_post',
             type: 'post'
         },
         {
             file: '../config/config',
             path: '/withdrawal_post',
             method_path: 'withdrawal_post',
             type: 'post'
         },
         {
             file: '../config/config',
             path: '/current_password_confirm_withdrawal',
             method_path: 'current_password_confirm_withdrawal',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
         {
             file: '../config/config',
             path: '/',
             method_path: '',
             type: 'get'
         },
     ],

     jsonrpc_api_path: '/api'
 }
