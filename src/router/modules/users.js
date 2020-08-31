// users.js
export default [
{
      path: '/userLog',
      children: [{
        path: 'users/userLog',
        component: () =>
          import('@/components/companyTree.vue')
      }]
    }
]