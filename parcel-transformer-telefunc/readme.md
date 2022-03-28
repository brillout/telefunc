Transforms the functions from included server-side modules (*.telefunc.ts) into http calls for use with [Telefunc](https://telefunc.com/).

##### Installation
.parcelrc 
```
{
    "extends": "@parcel/config-default",
    "transformers": {
        "*.telefunc.*": ["parcel-transformer-telefunc", "..."]
    }
}
```

##### Links
- [Telefunc](https://telefunc.com/)
- [See what the transformation actually does](https://telefunc.com/tour#how-it-works).
- [Client/server example project](https://github.com/vikejs/telefunc/tree/master/examples/express-and-parcel)
- [Development/ Contributing](CONTRIBUTING.md)


