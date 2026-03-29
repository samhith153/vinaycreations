import { Mail, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-white text-gray-900 min-h-screen flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-gray-50 p-10 rounded-2xl shadow-lg text-center space-y-8">

        <h1 className="text-4xl font-bold">
          Contact Me
        </h1>

        <p className="text-gray-600">
          For YouTube thumbnails, posters, and graphic design work,
          feel free to contact me.
        </p>

        <div className="space-y-5">

          {/* Email */}
          <div className="flex items-center justify-center gap-3">
            <Mail className="text-blue-500" size={20} />
            <p className="text-lg">
              vinaycreations5167@gmail.com
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-3">
            <Phone className="text-green-500" size={20} />
            <p className="text-lg">
              +91 9391243068
            </p>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919391243068?text=Hi%20I%20want%20a%20thumbnail%20design"
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
}