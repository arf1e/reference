import { ApiResponse, WithPagination } from '../../types/api';
import { AuthorType } from '../../types/authors';

export const authorsFixture: ApiResponse<
  WithPagination<{ authors: AuthorType[] }>
> = {
  status: 'success',
  data: {
    authors: [
      {
        _id: '656cdd343ada8883e5e7a6fd',
        name: 'Harold Abelson',
        bio: 'Harold Abelson is a Professor of Electrical Engineering and Computer Science at MIT.',
        image:
          'http://res.cloudinary.com/dzq4iaveg/image/upload/v1702452511/referencelib-authors/y8rurdknmso9rz34cpjj.jpg',
        booksCount: 1,
      },
      {
        _id: '656cdd343ada8883e5e7a6fe',
        name: 'Steve McConnell',
        bio: 'Steve McConnell is an American software engineer, author, and consultant.',
        image:
          'http://res.cloudinary.com/dzq4iaveg/image/upload/v1702451631/referencelib-authors/xwotqla5ce4xb1uyczhz.jpg',
        booksCount: 1,
      },
      {
        _id: '656cdd343ada8883e5e7a6ff',
        name: 'Charles Petzold',
        bio: 'Charles Petzold is an American programmer and technical author on Microsoft Windows applications.',
        image:
          'http://res.cloudinary.com/dzq4iaveg/image/upload/v1702451340/referencelib-authors/lfqheqzrtjcmodteypbk.jpg',
        booksCount: 1,
      },
      {
        _id: '65795f5b4d73c06b2b5941e8',
        name: 'Evi Nemeth',
        bio: 'Evi Nemeth was a notable computer scientist known for her work in UNIX and Linux system administration. She co-authored the widely used "UNIX and Linux System Administration Handbook." With a Ph.D. in computer science, she made significant contributions to system administration practices. Nemeth passed away in 2013, but her legacy endures through her influential writings and contributions to the field.',
        image:
          'http://res.cloudinary.com/dzq4iaveg/image/upload/v1702453082/referencelib-authors/etnnzp6qzyrhkz36lbao.jpg',
        booksCount: 1,
      },
    ],
    pagination: {
      page: 1,
      totalPages: 4,
    },
  },
};
