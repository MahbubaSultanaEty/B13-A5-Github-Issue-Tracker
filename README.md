
    - 1️⃣ What is the difference between var, let, and const?
Ans: 'var' is function-scoped, can be redeclared and reassigned.
'let' is block-scoped, cannot be redeclared, but can be reassigned.
'const' is block-scoped, cannot be redeclared or reassigned.
Use 'const' by default , this makes the code more organised and reduces confusion. USe 'let' if you need to change the value later and avoid 'var' as creates confusion in the code.


    - 2️⃣ What is the spread operator (...)?
Ans: The spread operator(...) in JavaScript is used to expand an array, object, or iterables into individual elements. You can use it to copy, merge, or pass values to funcions without changing the original data.


    - 3️⃣ What is the difference between map(), filter(), and forEach()?
Ans: In JavaScript , map() , filter(), and forEach() are used with arrays. They have some similarity in case of appllying but they work differently. 
The 'map()' method is the standard way to make a new array using arrow function in one line. It mostly get used for modifying values.

The 'filter()' method also creates a new array through a function but it returns a new array containing only the values that passes a conditions.

the 'forEach()' method is basically a method that loops through an array, similar to 'for' or 'for..of' loops but a bit more functional and cleaner. It takes a function and runs it once for each element in the array. Unlike map() or filter(), it does not return anything.



    - 4️⃣ What is an arrow function?
Ans: An 'arrow' function in JavaScript is a shorter way to write a function using the '=>' syntax. It’s like a shortcut for function, and it makes code cleaner and easier to read.

    - 5️⃣ What are template literals?
Template literals in JavaScript are the modern way to write strings that is more flexible and readable. Instead of using quotes ("" or '') or concat method, you use backticks `. Backticks allowes you to embed variables or expressions useing ${} or multiline HTML code directly inside a string.

