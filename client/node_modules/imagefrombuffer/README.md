
# imagefrombuffer

The perfect solution to display/show images in react js or next js from buffer data easy and quick


## usage

```javascript
import { imagefrombuffer } from "imagefrombuffer"; //first import 

function author() {
  return (
    <>
   // imagefrombuffer  function usage to show image in react or next js from buffer
      <img 
        src={imagefrombuffer({
          type: "content-type", // example image/jpeg 
          data: [bufferdata], // array buffer data 
        })}
      />
    </>
  );
}

export default author;

```


## Example

Here we are fetching data and and passing to the imagefrombuffer function 

```javascript
import React, { useEffect } from "react";
import { imagefrombuffer } from "imagefrombuffer"; //first import 

function author() {
  const [values, setvalues] = useState([]); // data

  const fetchauthor = async (e) => {
    let config = {
      method: "get",
      url: "http://localhost:8000/api/user/authorfind",
      headers: {
        Authorization: `Bearer ${thetoken()}`,
      },
    };

    await axios(config)
      .then((response) => {
        setvalues(response.data[0]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchauthor();
  }, []);
  return (
    <>
   // imagefrombuffer  function usage to show image in react or next js from buffer
      <img 
        src={imagefrombuffer({
          type: values.profilephoto?.contentType,
          data: values.profilephoto?.data?.data,
        })}
      />
    </>
  );
}

export default author;

```

