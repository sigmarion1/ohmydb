
# OhMyDB

The training tool for face-recognition classifier in web.

## Description

OhMyDB is the prototype for continousely train and improve the face recognition classifier in web based enviorment.
Thise frontend page helps users easily train and evaluate classifiers. Users can simply train or evaluate their custom models with just a few clicks.
The prototype is currently live on the https://ohmydb.com 


## ERD
![image](https://github.com/sigmarion1/ohmydb/assets/39878811/4ae8f044-6383-4c4f-9e07-48798502cfdf)


## AWS Architecture
![image](https://github.com/sigmarion1/ohmydb/assets/39878811/6c1af46a-1bc9-40ab-bad6-dac097116bb1)




## Getting Started

### Dependencies

* [python virtualenv](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment) 
* Tested in Windows 10/11 with WSL2, Mac OS

### Installing

```
git clone https://github.com/sigmarion1/ohmydb
```


### Executing program

* run back-end development server (required virtaulenv)
```
cd back
python manage.py runserver
```

* run front-end development server
```
cd front
npm start
```


## Help

```
- deploying this web application using vercel.
```

## Authors

Contributors names and contact info

- sigmarion1  

## Version History

* v3
    * Add admin site for train, annotating and evaluation
* v2
    * Service for image crawling and classify using specefic classifier.
* v1
    * Initial Release.

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.

* [react](https://react.dev/)
* [horzion-ui](https://horizon-ui.com/)
* [face-recognition](https://github.com/ageitgey/face_recognition)
  

