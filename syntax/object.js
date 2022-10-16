var member = ['egoing','k8805','hoya'];
console.log(member[1])
// array 반복문
member.map(param=>console.log('array ',param))

var roles = {
  'programmer':'egoing',
  'designer':'k8805',
  'manager':'hoya'
}
console.log(roles.designer)
console.log(roles['designer'])
// object 반복문
for(var name in roles){
  console.log('object --> ',name, 'value --> ',roles[name])
}