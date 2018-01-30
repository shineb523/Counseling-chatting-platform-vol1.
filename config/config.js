/*
 * 설정
 */

module.exports = {
    server_port: 3000

        ,
    db_url: 'mongodb://localhost:27017/local'

        ,
    db_schemas: [{
            file: './user_schema',
            collection: 'users1',
            schemaName: 'UserSchema',
            modelName: 'UserModel'
        }]

        ,
    route_info: [

        ]

        ,
    jsonrpc_api_path: '/api'
}
