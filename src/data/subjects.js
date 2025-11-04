const SUBJECTS = [
  {
    id: 'math',
    name: 'Toán học',
    grade: 'Lớp 10',
    totalUnitsText: '2 chương • Năm học 2024-2025',
    progress: 0.5,
    icon: 'calculator-outline',
    color: '#2f6aff',
    chapters: [
      {
        id: 'math-ch-1',
        title: 'Chương 1: Số thực',
        description: 'Tìm hiểu về tập hợp số thực, các phép toán cơ bản',
        completed: 3,
        total: 4,
        lessons: [
          {
            id: 'math-lesson-1',
            title: 'Khái niệm số thực',
            duration: '25 phút',
            status: 'completed',
          },
          {
            id: 'math-lesson-2',
            title: 'Các phép toán với số thực',
            duration: '30 phút',
            status: 'completed',
          },
          {
            id: 'math-lesson-3',
            title: 'Giá trị tuyệt đối',
            duration: '20 phút',
            status: 'in-progress',
            progress: 0.6,
          },
          {
            id: 'math-lesson-4',
            title: 'Bài tập tổng hợp',
            duration: '35 phút',
            status: 'locked',
          },
        ],
      },
      {
        id: 'math-ch-2',
        title: 'Chương 2: Hàm số bậc nhất',
        description: 'Khái niệm hàm số, tính chất và đồ thị hàm số bậc nhất',
        completed: 1,
        total: 5,
        lessons: [
          {
            id: 'math-lesson-5',
            title: 'Định nghĩa hàm số bậc nhất',
            duration: '22 phút',
            status: 'locked',
          },
          {
            id: 'math-lesson-6',
            title: 'Đồ thị hàm số bậc nhất',
            duration: '28 phút',
            status: 'locked',
          },
          {
            id: 'math-lesson-7',
            title: 'Hệ số góc và tung độ gốc',
            duration: '24 phút',
            status: 'locked',
          },
          {
            id: 'math-lesson-8',
            title: 'Ứng dụng thực tế',
            duration: '26 phút',
            status: 'locked',
          },
          {
            id: 'math-lesson-9',
            title: 'Bài tập luyện tập',
            duration: '32 phút',
            status: 'locked',
          },
        ],
      },
    ],
  },
  {
    id: 'literature',
    name: 'Ngữ văn',
    grade: 'Lớp 10',
    totalUnitsText: '3 chương • Năm học 2024-2025',
    progress: 0.3,
    icon: 'book-outline',
    color: '#00c274',
    chapters: [
      {
        id: 'lit-ch-1',
        title: 'Chương 1: Truyện dân gian',
        description: 'Khám phá các thể loại truyền thuyết, cổ tích, truyện cười',
        completed: 2,
        total: 5,
        lessons: [
          {
            id: 'lit-lesson-1',
            title: 'Đặc điểm truyện dân gian',
            duration: '18 phút',
            status: 'completed',
          },
          {
            id: 'lit-lesson-2',
            title: 'Truyền thuyết và ý nghĩa',
            duration: '24 phút',
            status: 'completed',
          },
          {
            id: 'lit-lesson-3',
            title: 'Cổ tích: cấu trúc và nhân vật',
            duration: '26 phút',
            status: 'in-progress',
            progress: 0.4,
          },
          {
            id: 'lit-lesson-4',
            title: 'Truyện cười',
            duration: '20 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-5',
            title: 'Ôn tập chương',
            duration: '30 phút',
            status: 'locked',
          },
        ],
      },
      {
        id: 'lit-ch-2',
        title: 'Chương 2: Thơ ca trung đại',
        description: 'Những tác phẩm thơ ca tiêu biểu thời trung đại',
        completed: 1,
        total: 4,
        lessons: [
          {
            id: 'lit-lesson-6',
            title: 'Giới thiệu thơ ca trung đại',
            duration: '22 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-7',
            title: 'Thơ Nôm và thơ chữ Hán',
            duration: '24 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-8',
            title: 'Phân tích tác phẩm tiêu biểu',
            duration: '28 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-9',
            title: 'Ôn tập chương',
            duration: '26 phút',
            status: 'locked',
          },
        ],
      },
      {
        id: 'lit-ch-3',
        title: 'Chương 3: Tập làm văn',
        description: 'Phương pháp làm bài nghị luận và biểu cảm',
        completed: 0,
        total: 4,
        lessons: [
          {
            id: 'lit-lesson-10',
            title: 'Bố cục bài văn nghị luận',
            duration: '18 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-11',
            title: 'Lập dàn ý và triển khai luận điểm',
            duration: '24 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-12',
            title: 'Bài văn biểu cảm',
            duration: '22 phút',
            status: 'locked',
          },
          {
            id: 'lit-lesson-13',
            title: 'Luyện tập tổng hợp',
            duration: '30 phút',
            status: 'locked',
          },
        ],
      },
    ],
  },
];

export const getSubjectById = (id) => SUBJECTS.find((subject) => subject.id === id);

export default SUBJECTS;
