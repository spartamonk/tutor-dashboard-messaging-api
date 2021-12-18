const result = document.querySelector('.result');

const fetchData = async() => {
 
try {
 // const {data} = await axios.get('/.netlify/functions/1-tutors');
  const { data } = await axios.get('/api/1-tutors')
result.innerHTML=`${data}`
} catch (error) {
 console.log(error.response);
}
}

fetchData();