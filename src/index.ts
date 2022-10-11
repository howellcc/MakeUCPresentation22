class Main {
   name: string = "World!";

   getName() {
      return this.name;
   }
}

let objMain = new Main();
console.log("Hello ", objMain.getName());
