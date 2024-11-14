import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto p-8 max-w-4xl">
      <h1 className="mb-6 font-bold text-3xl text-center">
        About Our Product Management App
      </h1>

      <p className="mb-6 text-lg">
        Welcome to our Product Management app! This application allows you to
        manage and explore products from different sources. It has two key
        sections designed to help you work efficiently:
      </p>

      <h2 className="mt-4 mb-2 font-semibold text-2xl">API Products</h2>
      <p className="mb-4 text-lg">
        In the <strong>API Products</strong> section, you can view a list of
        products fetched from an external product API. This section allows you
        to explore product details such as the title, description, and price of
        each item, all updated in real-time. Browse through various products and
        discover new items available in the marketplace.
      </p>

      <h2 className="mt-4 mb-2 font-semibold text-2xl">My Products</h2>
      <p className="mb-6 text-lg">
        The <strong>My Products</strong> section lets you manage your own
        product catalog. Here, you can add new products to your personal
        inventory, edit their details, and search through your existing products
        by title. This section is ideal for tracking and organizing products you
        have created or own.
      </p>

      <h3 className="mt-6 font-semibold text-xl">Features:</h3>
      <ul className="space-y-2 mb-6 pl-6 text-lg list-disc">
        <li>View products from an external API in real-time</li>
        <li>Manage your own product catalog by adding and editing products</li>
        <li>Search and filter your products by title</li>
        <li>Simple and intuitive interface for easy product management</li>
      </ul>

      <p className="text-lg">
        This app is designed to help users manage their products and explore
        external product catalogs seamlessly. We hope you enjoy using it!
      </p>
    </div>
  );
};

export default AboutPage;
