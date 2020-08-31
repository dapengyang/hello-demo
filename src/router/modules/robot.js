// robot.js
export default [
{
      path: '/robot',
      children: [{
        path: 'robot/userLog',
        component: () =>
          import('@/components/companyTree')
      },]
    }
]