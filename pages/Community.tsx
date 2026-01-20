import React, { useState, useRef } from 'react';
import { IMAGES } from '../constants';

const Community = () => {
    const [postText, setPostText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial posts data
    const [posts, setPosts] = useState([
        { id: 4, user: "Marvin R.", time: "Hace 2 min", text: "¡Finalizando la rutina de tríceps con todo! 💪", likes: 12, image: IMAGES.USER_TRICEPS },
        { id: 3, user: "Marvin R.", time: "Hace 10 min", text: "Dándole duro al pecho hoy. La constancia es la clave. 🔥", likes: 18, image: IMAGES.USER_CHEST },
        { id: 2, user: "Marvin R.", time: "Hace 25 min", text: "Empezando el día con unos buenos kilómetros en la cinta. 🏃‍♂️💨", likes: 15, image: IMAGES.USER_TREADMILL },
        { id: 1, user: "Carlos G.", time: "Hace 1 hora", text: "¡Reto superado! Logré mis primeros 5km sin parar en menos de 28 minutos. 🏃‍♂️💨", likes: 24, image: null as string | null }
    ]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            // Create a fake local URL for preview
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const handlePost = () => {
        if (!postText.trim() && !selectedFile) return;

        const newPost = {
            id: Date.now(),
            user: "Marvin R.",
            time: "Ahora mismo",
            text: postText,
            likes: 0,
            image: preview // Store the object URL
        };

        setPosts([newPost, ...posts]);
        setPostText('');
        setSelectedFile(null);
        setPreview(null);
    };

    const handleLike = (id: number) => {
        setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    };

    const handleDelete = (id: number) => {
        if (window.confirm("¿Seguro que quieres eliminar esta publicación?")) {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    return (
        <div className="flex h-full">
            <main className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark p-8">
                <div className="max-w-4xl mx-auto w-full space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Mis Logros Recientes</h2>
                        {/* Editable Achievements Area - Simulated for now */}
                        <div className="grid grid-cols-2 md://grid-cols-4 gap-4">
                            {[
                                { label: "Madrugador", icon: "wb_sunny" },
                                { label: "7 Días Racha", icon: "local_fire_department" },
                                { label: "Meta Alcanzada", icon: "flag" },
                                { label: "Power Lifter", icon: "fitness_center" }
                            ].map((badge, idx) => (
                                <div key={idx} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md cursor-default">
                                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-sm">{badge.label}</h3>
                                </div>
                            ))}
                            {/* Add Achievement Button (Visual only) */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-300 dark:border-border-dark p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all text-slate-400"
                            >
                                <span className="material-symbols-outlined text-3xl mb-2">add_a_photo</span>
                                <span className="font-bold text-xs">Subir Foto</span>
                            </button>
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary">forum</span>
                            <h2 className="text-2xl font-bold">Muro de Comunidad</h2>
                        </div>

                        {/* Create Post Area */}
                        <div className="bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 mb-6 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <textarea
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 placeholder:text-slate-500 text-lg resize-none mb-4 outline-none"
                                placeholder="¿Cómo vas hoy? Comparte tus videos o fotos..."
                                rows={2}
                            ></textarea>

                            {/* Image Preview */}
                            {preview && (
                                <div className="mb-4 relative inline-block">
                                    <img src={preview} alt="Preview" className="h-32 rounded-xl object-cover border border-slate-200 dark:border-border-dark" />
                                    <button
                                        onClick={() => { setPreview(null); setSelectedFile(null); }}
                                        className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 shadow-md hover:bg-black/80"
                                    >
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-border-dark">
                                <div className="flex gap-2 text-slate-400">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="hover:bg-slate-100 dark:hover:bg-border-dark p-2 rounded-full transition-colors flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-primary">add_photo_alternate</span>
                                        <span className="text-xs font-bold text-slate-500">Foto/Video</span>
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*,video/*"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                                <button
                                    onClick={handlePost}
                                    disabled={!postText.trim() && !selectedFile}
                                    className="bg-primary px-6 py-2 rounded-lg text-black font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Publicar
                                </button>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-300 group/post">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.COMMUNITY_AVATAR_1}')` }}></div>
                                            <div><p className="font-bold text-sm">{post.user}</p><p className="text-xs text-slate-500">{post.time}</p></div>
                                        </div>
                                        {post.user === 'Marvin R.' && (
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-slate-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover/post:opacity-100"
                                                title="Excluir publicación"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        )}
                                    </div>

                                    {post.text && <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{post.text}</p>}

                                    {post.image && (
                                        <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 dark:border-border-dark">
                                            <img src={post.image} alt="Post content" className="w-full max-h-96 object-cover" />
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors group"
                                    >
                                        <span className="material-symbols-outlined group-hover:scale-125 transition-transform group-active:scale-95">celebration</span>
                                        Aplaudir ({post.likes})
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div >
            </main >
        </div >
    );
};

export default Community;