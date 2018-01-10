var genereateMessage =(from,text)=>{
  return {
    from,
    text,
    createAt:new Date().getTime()
  };
};

var genereateLocationMessage =(coords)=>{
  return {
    from:'User',
    url:`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createAt:new Date().getTime()
  };
};


module.exports={genereateMessage,genereateLocationMessage};
