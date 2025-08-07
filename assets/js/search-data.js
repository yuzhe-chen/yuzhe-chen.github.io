// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-music",
          title: "music",
          description: "achievements and highlighted performances",
          section: "Navigation",
          handler: () => {
            window.location.href = "/music/";
          },
        },{id: "nav-academics",
          title: "academics",
          description: "achievements",
          section: "Navigation",
          handler: () => {
            window.location.href = "/academics/";
          },
        },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "books-animal-farm",
          title: 'Animal Farm',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/animal_farm/";
            },},{id: "books-",
          title: '',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/blink_gladwell/";
            },},{id: "books-boy-tales-of-childhood",
          title: 'Boy (Tales of Childhood)',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/boy_dahl/";
            },},{id: "books-charlotte-39-s-web",
          title: 'Charlotte&amp;#39;s Web',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/charlotte_web/";
            },},{id: "books-the-disappearing-spoon",
          title: 'The Disappearing Spoon',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/disappearing_spoon/";
            },},{id: "books-guns-germs-and-steel-the-fates-of-human-societies",
          title: 'Guns, Germs, and Steel (The Fates of Human Societies)',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/guns_germs_steel/";
            },},{id: "books-harry-potter-series",
          title: 'Harry Potter Series',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/harry_potter/";
            },},{id: "books-the-lord-of-the-rings",
          title: 'The Lord of the Rings',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/lord_of_the_rings/";
            },},{id: "books-to-kill-a-mockingbird",
          title: 'To Kill a Mockingbird',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/mockingbird/";
            },},{id: "books-the-count-of-monte-cristo",
          title: 'The Count of Monte-Cristo',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/monte_cristo/";
            },},{id: "books-the-giver",
          title: 'The Giver',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_giver/";
            },},{id: "books-placeholder",
          title: 'Placeholder',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "books-the-little-prince",
          title: 'The Little Prince',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_little_prince/";
            },},{id: "books-the-odyssey",
          title: 'The Odyssey',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_odyssey/";
            },},{id: "books-",
          title: '',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/tipping_point/";
            },},{id: "books-the-violinist-39-s-thumb",
          title: 'The Violinist&amp;#39;s Thumb',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/violinist_thumb/";
            },},{id: "books-a-wrinkle-in-time",
          title: 'A Wrinkle in Time',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/wrinkle_in_time/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%74%72%6F%70%65%6C%65%74@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/yuzhe-chen", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@espressoofjoy--music0411", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
