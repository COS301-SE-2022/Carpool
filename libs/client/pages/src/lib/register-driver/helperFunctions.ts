//file name: helperFunctions.js
const API_KEY = 'AIzaSyBWXW1Mq7vb6wIIfdHFEzp9xuknlomPJkg'; //put your key here.
//this endpoint will tell Google to use the Vision API. We are passing in our key as well.
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
function generateBody(image: string) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION', //we will use this API for text detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

type textAnnotation = {
  description: string;
  boundingPoly: {
    vertices: {
      x: number;
      y: number;
    }[];
  };
};

async function callGoogleVisionAsync(image: string) {
  const body = generateBody(image);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();

  const res = result.responses[0].textAnnotations;

  console.log('02/6502225129088'.includes('02/'));

  // const idNo = res.find((o: textAnnotation) =>
  //   o.description.includes('02/6502225129088')
  // );

  const fullText = result.responses[0].fullTextAnnotation.text;

  const idNo = fullText.substring(
    fullText.indexOf('02/') + 3,
    fullText.indexOf('02/') + 3 + 13
  );

  // const idNo = res.find(
  //   (o: textAnnotation) => o.description === '02/6502225129088'
  // );

  console.log(idNo);

  console.log(result);
  const detectedText = result.responses[0].fullTextAnnotation;
  return idNo ? idNo : { text: "This image doesn't contain any text!" };
}

export default callGoogleVisionAsync;
