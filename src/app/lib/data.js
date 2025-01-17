const interviewQuestionAndAnswer = [
  {
    question: 'What is Node.js?',
    answer:
      'Node.js is a JavaScript engine used for executing JavaScript code outside the browser. It is normally used to build the backend of the application and is highly scalable.',
  },
  {
    question: 'What is the difference between Node.js and JavaScript?',
    answer: `JavaScript is a scripting language whereas Node.js is an engine that provides the runtime environment to run JavaScript code. Here we have difference table between Node.js and JavaScript:
    Node.js:
    - Server-side runtime environment
    - Allows running JavaScript code on server
    - Built on Chrome’s V8 JavaScript engine
    - Enables building scalable network applications
    - Provides access to file system and network resources
    - Supports event-driven, non-blocking I/O operations
    - Used for building backend APIs, servers, and applications.
    
    JavaScript:
    - Client-side scripting language
    - Primarily used for web development
    - Runs in a web browser’s JavaScript engine
    - Executes code within a browser environment
    - Limited to browser APIs and capabilities
    - Executes in a single-threaded event loop
    - Utilized for creating interactive web pages and client-side logic.`,
  },
  {
    question: 'Is Node.js single-threaded?',
    answer:
      'Yes, Node.js is single-threaded by default. However, it utilizes event-driven architecture and non-blocking I/O operations to handle multiple concurrent requests efficiently, enabling scalability and high performance in applications.',
  },
  {
    question: 'What kind of API function is supported by Node.js?',
    answer:
      'There are two types of API functions supported by Node.js: Synchronous (used for blocking code) and Asynchronous (used for non-blocking code).',
  },
  {
    question:
      'What is the difference between Synchronous and Asynchronous functions?',
    answer: `Synchronous Functions:
    - Blocks the execution until the task completes.
    - Executes tasks sequentially; each task must complete before the next one starts.
    - Returns the result immediately after completion.
    - Errors can be easily caught with try-catch blocks.
    - Suitable for simple, sequential tasks with predictable execution flow.
  
    Asynchronous Functions:
    - Does not block the execution; allows other tasks to proceed concurrently.
    - Initiates tasks and proceeds with other operations while waiting for completion.
    - Typically returns a promise, callback, or uses event handling to handle the result upon completion.
    - Error handling is more complex and often involves callbacks, promises, or async/await syntax.
    - Ideal for I/O-bound operations, network requests, and tasks requiring parallel processing.`,
  },
  {
    question: 'What is a module in Node.js?',
    answer:
      'In Node.js Application, a Module can be considered as a block of code that provide a simple or complex functionality that can communicate with external applications. Modules can be organized in a single file or a collection of multiple files/folders. Examples of modules include http, fs, os, path, etc.',
  },
  {
    question: 'What is npm and its advantages?',
    answer:
      'npm (Node Package Manager) is the default package manager for Node.js. It allows developers to discover, share, and reuse code packages easily. Its advantages include dependency management, version control, centralized repository, and seamless integration with Node.js projects.',
  },
  {
    question: 'What is middleware?',
    answer:
      'Middleware is a function that works between the request and the response cycle. It gets executed after the server receives the request and before the controller sends the response.',
  },
  {
    question:
      'How does Node.js handle concurrency even after being single-threaded?',
    answer:
      'Node.js handles concurrency by using asynchronous, non-blocking operations. It can initiate multiple tasks and continue processing while waiting for them to finish, all within a single thread.',
  },
  {
    question: 'What is control flow in Node.js?',
    answer:
      'Control flow in Node.js refers to the sequence in which statements and functions are executed. It manages the order of execution, handling asynchronous operations, callbacks, and error handling to ensure smooth program flow.',
  },
  {
    question: 'What do you mean by event loop in Node.js?',
    answer:
      'The event loop in Node.js is a mechanism that allows it to handle multiple asynchronous tasks concurrently within a single thread. It continuously listens for events and executes associated callback functions.',
  },
  {
    question:
      'What is the order in which control flow statements get executed?',
    answer:
      'The order in which statements are executed is as follows: execution and queue handling, collection of data and storing it, handling concurrency, and executing the next lines of code.',
  },
  {
    question: 'What are the main disadvantages of Node.js?',
    answer:
      'Main disadvantages of Node.js: Single-threaded nature (may not fully utilize multi-core CPUs), NoSQL preference (relational databases like MySQL aren’t commonly used), and rapid API changes (frequent updates can introduce instability and compatibility issues).',
  },
  {
    question: 'What is REPL in Node.js?',
    answer:
      'REPL in Node.js stands for Read, Evaluate, Print, and Loop. It is a computer environment similar to the shell, useful for writing and debugging code as it executes the code in one go.',
  },
  {
    question: 'How to import a module in Node.js?',
    answer:
      'We use the require module to import external libraries in Node.js. The result returned by require() is stored in a variable, which is used to invoke the functions using dot notation.',
  },
  {
    question: 'What is the difference between Node.js and AJAX?',
    answer:
      'Node.js is a JavaScript runtime environment that runs on the server side, whereas AJAX is a client-side programming language that runs in the browser.',
  },
  {
    question: 'What is package.json in Node.js?',
    answer:
      'package.json in Node.js is a metadata file that contains project-specific information such as dependencies, scripts, version, author details, and other configuration settings required for managing and building the project.',
  },
  {
    question: 'What is the most popular Node.js framework used these days?',
    answer:
      'The most popular Node.js framework is Express.js, as it is highly scalable, efficient, and requires very few lines of code to create an application.',
  },
  {
    question: 'What are promises in Node.js?',
    answer:
      'A promise is an advancement of callbacks in Node.js. It is a JavaScript object used to handle asynchronous operations and helps solve the problem of callback hell.',
  },
]

module.exports = interviewQuestionAndAnswer
