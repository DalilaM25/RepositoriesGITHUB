// Замокированный класс DOMRect
export class MockDOMRect {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 0,
    public height: number = 0
  ) {}

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }

  get left() {
    return this.x;
  }
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
    };
  }
}

// Замокированный класс IntersectionObserver
export class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  private options: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options || {};
  }

  observe(element: Element) {
    const entry: IntersectionObserverEntry = {
      isIntersecting: true,
      target: element,
      time: 555,
      intersectionRatio: 1,
      boundingClientRect: new MockDOMRect(),
      intersectionRect: new MockDOMRect(),
      rootBounds: new MockDOMRect(),
    };
    this.callback([entry], this as unknown as IntersectionObserver);
  }

  unobserve() {}
  disconnect() {}

  get root() {
    return null;
  }

  get rootMargin() {
    return this.options.rootMargin || "";
  }

  get thresholds() {
    return Array.isArray(this.options.threshold)
      ? this.options.threshold
      : [this.options.threshold || 0];
  }

  takeRecords() {
    return [];
  }
}

export const mockRepositories = [
  {
    owner: {
      login: "testUser1",
      avatar_url: "https://example.com/avatar.png",
    },
    id: 1,
    name: "test-repo1",
    forks_count: 5,
    stargazers_count: 10,
    description: "This is a test repository",
    html_url: "https://github.com/testUser/test-repo",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  },
  {
    owner: {
      login: "testUser2",
      avatar_url: "https://example.com/avatar.png",
    },
    id: 2,
    name: "test-repo2",
    forks_count: 5,
    stargazers_count: 10,
    description: "This is a test repository",
    html_url: "https://github.com/testUser/test-repo",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  },
];
export const mockGetRepositories = jest.fn();
export const mockRemoveRepositoryByID = jest.fn();
export const mockSetPage = jest.fn();
export const mockRepos = {
  repositories: mockRepositories,
  getRepositories: mockGetRepositories,
  loading: false,
  page: 1,
  setPage: mockSetPage,
  totalPages: 2,
  removeRepositoryByID: mockRemoveRepositoryByID,
  filter: "",
  order: "",
};
