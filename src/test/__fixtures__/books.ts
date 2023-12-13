import { ApiResponse, WithPagination } from '../../types/api';
import { BookType } from '../../types/books';

export const booksFixture: ApiResponse<WithPagination<{ books: BookType[] }>> =
  {
    status: 'success',
    data: {
      books: [
        {
          _id: '656cdd353ada8883e5e7a71d',
          isbn: '9780735619678',
          title: 'Code Complete',
          publisher: 'Microsoft Press',
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702286295/referencelib-images/n5pvuikg3jgsffoumbzz.jpg',
          publishedDate: '1970-01-01T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '656cdd343ada8883e5e7a6fc',
              title: 'Software Architecture',
              booksCount: 6,
            },
          ],
        },
        {
          _id: '656cdd353ada8883e5e7a728',
          isbn: '9780735611313',
          title: 'Code: The Hidden Language of Computer Hardware and Software',
          publisher: 'Microsoft Press',
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702451143/referencelib-images/edqsfkdxt7xsrh2zhrnk.jpg',
          publishedDate: '1970-01-01T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '656cdd343ada8883e5e7a6fc',
              title: 'Software Architecture',
              booksCount: 6,
            },
          ],
        },
        {
          _id: '657964604d73c06b2b5942cc',
          isbn: '9780321344755',
          title: "Don't Make Me Think",
          publisher: 'New Riders',
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702454360/referencelib-images/okypsfrqr0fl5iph2qa5.jpg',
          publishedDate: '2005-08-18T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '6578a5e71422f7c18d055ae0',
              title: 'Design',
              booksCount: 3,
            },
            {
              _id: '6578a5e91422f7c18d055ae4',
              title: 'People',
              booksCount: 8,
            },
          ],
        },
        {
          _id: '65797ad44d73c06b2b59477e',
          isbn: '9780316778497',
          title:
            "How Would You Move Mount Fuji?: Microsoft's Cult of the Puzzle",
          publisher: 'Hachette Book Group USA',
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702460109/referencelib-images/l7bkbamal4grmbxcwl15.jpg',
          publishedDate: '2007-01-01T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '6578a5e91422f7c18d055ae4',
              title: 'People',
              booksCount: 8,
            },
          ],
        },
        {
          _id: '65798fef4d73c06b2b5949e8',
          isbn: '9781098109158',
          title: 'Ansible: Up and Running',
          publisher: "O'Reilly Media",
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702465512/referencelib-images/zstmyvw261fdgtedkeos.png',
          publishedDate: '2022-08-16T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '6578a5e11422f7c18d055adc',
              title: 'Operational Systems',
              booksCount: 3,
            },
            {
              _id: '65797bf84d73c06b2b5947c9',
              title: 'Developer Productivity',
              booksCount: 2,
            },
          ],
        },
        {
          _id: '6579926d4d73c06b2b594a6a',
          isbn: '0201558025',
          title: 'Concrete Mathematics: A Foundation for Computer Science',
          publisher: 'Addison–Wesley',
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702466150/referencelib-images/hbjrjp0cgknvqgxc6bvz.jpg',
          publishedDate: '1994-01-01T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '656cdd343ada8883e5e7a6fc',
              title: 'Software Architecture',
              booksCount: 6,
            },
            {
              _id: '6578a5d11422f7c18d055acc',
              title: 'Math',
              booksCount: 1,
            },
          ],
        },
        {
          _id: '657994ff4d73c06b2b594b10',
          isbn: '9781098111755',
          title:
            'Learning Functional Programming: Managing Code Complexity by Thinking Functionally',
          publisher: "O'Reilly Media",
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702466808/referencelib-images/qyudjwdfjfctelmbad0n.jpg',
          publishedDate: '2022-09-22T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '656cdd343ada8883e5e7a6fc',
              title: 'Software Architecture',
              booksCount: 6,
            },
            {
              _id: '6578a5da1422f7c18d055ad4',
              title: 'Functional Programming',
              booksCount: 1,
            },
          ],
        },
        {
          _id: '657996464d73c06b2b594b94',
          isbn: '978159059389',
          title: 'Joel on Software',
          publisher: 'Apress',
          image:
            'http://res.cloudinary.com/dzq4iaveg/image/upload/b_gen_fill,c_pad,h_500,w_375/v1702467506/referencelib-images/o73rtpvi87tnwnl8fmnk.jpg',
          publishedDate: '2004-08-16T00:00:00.000Z',
          status: 'available',
          authors: [],
          genres: [
            {
              _id: '6578a5e91422f7c18d055ae4',
              title: 'People',
              booksCount: 8,
            },
            {
              _id: '6578de6fb79094143bb65d92',
              title: 'Life',
              booksCount: 3,
            },
          ],
        },
      ],
      pagination: {
        page: 1,
        totalPages: 3,
      },
    },
  };
