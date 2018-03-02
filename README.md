# c2-[package]

## Creating a New Package From the Template
1. Create a new GitHub repository without a readme
2. Open Terminal
3. Create a bare clone of this repository
````
$ git clone --bare git@github.com:ClearC2/package-template.git
````
4. Mirror push to your new repository
````
$ cd package-template.git
$ git push --mirror <your new package git URI created in step 1>
````
5. Remove the temporary local repository you created in step 3
````
$ cd ..
$ rm -rf package-template.git
````
6. Change your `package.json` to conform to your new package instead of `c2-map`. This includes:
  - name
  - description
  - keywords
  - repository URL
  - bugs URL
  - homepage URL

7. Change the `README.md` to to conform to your package. This includes:
  - title
  - deleting the `Creating a New Package From the Template` section

8. Commit your changes to the `package.json` and `README.md` push them up to GitHub. Your package is now ready for development
