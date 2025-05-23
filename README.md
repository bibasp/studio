---

## 🛠️ Getting Started

Follow these steps to get Chronicle Canvas running locally:

**Prerequisites:**

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

**Installation:**

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <your-repository-folder>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

**Running the Development Servers:**

1.  **Run the Next.js application:**
    This server handles the frontend and UI.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002` (or the port specified in your `package.json`).

2.  **Run the Genkit development server (in a separate terminal):**
    This server hosts your AI flows and allows them to be called by the Next.js app.
    ```bash
    npm run genkit:dev
    ```
    Or, for automatic reloading on changes to AI flows:
    ```bash
    npm run genkit:watch
    ```
    The Genkit development UI will typically be available at `http://localhost:4000`.

    **Note:** You'll need to have your Genkit environment (e.g., Google AI API key in `.env`) set up for the AI features to work. Create a `.env` file in the root of the project if it doesn't exist:
    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
    ```

---

## 🧠 AI Features Deep Dive

Chronicle Canvas integrates Genkit to provide powerful AI capabilities:

*   **`generatePostSummary` Flow (`src/ai/flows/generate-post-summary.ts`):**
    *   Takes full blog post content as input.
    *   Generates a concise and engaging summary suitable for previews.
    *   Used in the "AI Summary" page.

*   **`generateBlogArticle` Flow (`src/ai/flows/generate-blog-article-flow.ts`):**
    *   Takes a topic and optional word count as input.
    *   Leverages a detailed system prompt to instruct the LLM on "Chronicle Canvas" tone, style, and structure.
    *   Outputs a complete article including title, content, summary, relevant tags, and a hint for an accompanying image.
    *   Used in the "AI Article" page.

---

## 🎨 Customization

*   **Theme Customizer:** Access the theme customizer via the palette icon in the header to change primary, accent, background, and foreground colors on the fly.
*   **Global Styles (`src/app/globals.css`):** For deeper theme modifications, edit the HSL CSS variables defined in this file. The `tailwind.config.ts` is set up to use these variables.

---

## 💡 Future Enhancements (Ideas)

*   **Real Database Integration:** Replace mock post data with a persistent database (e.g., Firestore, Supabase, Prisma with PostgreSQL).
*   **User Authentication:** Allow users to sign up, log in, and manage their own posts.
*   **Rich Text Editor:** Implement a more advanced editor for creating and editing posts.
*   **Image Uploads:** Allow authors to upload their own cover images.
*   **Comments Section:** Enable reader interaction on posts.
*   **Deployment:** Set up for deployment on platforms like Vercel or Firebase Hosting.

---

Enjoy building and blogging with Chronicle Canvas!
