# Currency Converter

<img src="https://i.hizliresim.com/1iql6d6.png">

<h1>What's that?</h1>
<p>Currency Converter is an application for calculating what the amount is worth in
   another currency.</p>

<h2>Prerequisites</h2>
<h4>For development:</h4>
<p>To download the dependencies of the project, you can use the following command in the directory of package.json: </p>

```
npm install
```

<b>Please note that Node.js with version 14.5.0 and npm with version 6.14.5 must be also installed in order to run this command.</b>

<h4>For production:</h4>
<p>By using Dockerfile in the project's directory, you can run the following command in order to create a Docker image:</p>

```
docker build -t <name-of-the-image> .
```
<b>Please note that Docker must be installed in the machine that you want to run the app.</b>

<p>You can verify the Docker image by using the following command:</p>

```
docker images
```

<h2>Usage</h2>
<p>Use the following command to run the application: </p>

```
npm start
```

<p>Or alternatively, you can run the Docker image that you have created by using the following command:</p>

```
docker run -d -it -p 80:80/tcp --name <name-of-the-container> <name-of-the-image>:latest
```

<p>After running the application, you can browse to localhost:3000(with npm install) or localhost:80(with Docker) and the following screen welcomes you.</p>

<img src="https://i.hizliresim.com/31tpwzz.PNG">

Type the amount that you want to convert and then press the green button(with check icon) on the right in order to perform the conversion and see its result. 

You can also use the yellow button(with arrow icon) in the middle to switch between the currencies.

After performing the conversion you can also see the exchange rates historically in a table or in a graph. By changing the days from the dropdown(default is 7 days), you can see more historical data.

<img src="https://i.hizliresim.com/e101ssq.PNG">

Moreover, all of you conversion results are stored in your browser's local storage and it can be reached via the Conversion History tab on top. 

<img src="https://i.hizliresim.com/53wgr7z.PNG">

Action buttons will be shown when the mouse arrow enters the actions column. By pressing the blue button(with eye icon) you can switch to the Currency Converter tab and perform the conversion. Also if you want to delete the specific conversion from the history you can press the red button(with bin icon).  
