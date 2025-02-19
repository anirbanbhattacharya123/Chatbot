interface TopicDetail {
  topic: string;
  description: string;
  examples?: string;
}

interface ProgrammingKnowledge {
  [key: string]: {
    [key: string]: TopicDetail;
  };
}

export const programmingKnowledge: ProgrammingKnowledge = {
  'C++': {
    'pointers': {
      topic: 'Pointers',
      description: 'Pointers are variables that store memory addresses. They are fundamental to C++ and enable direct memory manipulation.',
      examples: `int* ptr = &value;  // Declaration and initialization
void* ptr = nullptr;  // Null pointer
delete ptr;          // Memory deallocation`
    },
    'memory-management': {
      topic: 'Memory Management',
      description: 'C++ provides manual memory management through new/delete operators and smart pointers for automatic management.',
      examples: `std::unique_ptr<int> ptr(new int(42));
std::shared_ptr<MyClass> shared = std::make_shared<MyClass>();
std::vector<int> vec;  // Automatic memory management`
    },
    'stl': {
      topic: 'Standard Template Library (STL)',
      description: 'STL provides reusable container classes, algorithms, and iterators.',
      examples: `std::vector<int> vec;
std::map<string, int> map;
std::sort(vec.begin(), vec.end());`
    },
    'templates': {
      topic: 'Templates',
      description: 'Templates enable generic programming, allowing functions and classes to work with different data types.',
      examples: `template<typename T>
T max(T a, T b) { return a > b ? a : b; }`
    },
    'oop': {
      topic: 'Object-Oriented Programming',
      description: 'C++ supports encapsulation, inheritance, and polymorphism through classes and objects.',
      examples: `class Shape {
  virtual void draw() = 0;  // Pure virtual function
};`
    },
    'move-semantics': {
      topic: 'Move Semantics',
      description: 'Modern C++ feature that enables efficient transfer of resources between objects.',
      examples: `std::string str = std::move(other);  // Move constructor
vec.push_back(std::move(element));`
    },
    'lambda': {
      topic: 'Lambda Expressions',
      description: 'Anonymous function objects that can capture variables from their enclosing scope.',
      examples: `auto sum = [](int a, int b) { return a + b; };
std::for_each(vec.begin(), vec.end(), [&total](int x) { total += x; });`
    }
  },
  'Python': {
    'data-structures': {
      topic: 'Data Structures',
      description: 'Python provides built-in data structures like lists, dictionaries, sets, and tuples.',
      examples: `list_example = [1, 2, 3]
dict_example = {'key': 'value'}
set_example = {1, 2, 3}`
    },
    'comprehensions': {
      topic: 'List Comprehensions',
      description: 'Concise way to create lists, sets, and dictionaries based on existing iterables.',
      examples: `squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]`
    },
    'decorators': {
      topic: 'Decorators',
      description: 'Functions that modify the behavior of other functions or classes.',
      examples: `@property
def name(self):
    return self._name

@classmethod
def from_string(cls, string):
    return cls(string)`
    },
    'generators': {
      topic: 'Generators',
      description: 'Functions that can pause and resume execution, yielding values one at a time.',
      examples: `def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b`
    },
    'async': {
      topic: 'Async/Await',
      description: 'Asynchronous programming support for concurrent operations.',
      examples: `async def fetch_data():
    async with aiohttp.ClientSession() as session:
        response = await session.get(url)`
    },
    'type-hints': {
      topic: 'Type Hints',
      description: 'Optional static type annotations for variables, functions, and classes.',
      examples: `def greet(name: str) -> str:
    return f"Hello, {name}!"

Vector = List[float]`
    },
    'context-managers': {
      topic: 'Context Managers',
      description: 'Objects that manage resource allocation and deallocation.',
      examples: `with open('file.txt', 'r') as f:
    content = f.read()

class DatabaseConnection:
    def __enter__(self):
        # Setup
    def __exit__(self):
        # Cleanup`
    }
  }
};