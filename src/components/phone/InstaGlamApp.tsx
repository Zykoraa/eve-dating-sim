import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Camera, 
  Sparkles, 
  Send, 
  Plus
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import type { InstaPost, InstaComment } from '../../types/game';

export const InstaGlamApp: React.FC = () => {
  const { state, addInstaPost, toggleLikeInstaPost, addInstaComment } = useGameStore();
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedCaptionIdx, setSelectedCaptionIdx] = useState(0);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const era = state.transitionEra;
  const followersCount = era === 1 ? '184' : era === 2 ? '720' : era === 3 ? '2.4K' : '9.8K';
  const followingCount = '128';

  const CAPTION_PRESETS = [
    {
      caption: `Day ${state.stats.hrtMonth * 30} milestone. Stepping out into the sunlight without hiding 🌸`,
      tag: 'Milestone',
    },
    {
      caption: 'Thrift fit check ✨ When the outfit gives gender euphoria you just have to document it.',
      tag: 'Style Check',
    },
    {
      caption: 'Late night music, good vibrations, and people who see the real me 🎸💖',
      tag: 'Vibe',
    },
    {
      caption: 'Soft glam mirror moment before tonight’s date. Feeling gentle with myself.',
      tag: 'Date Night',
    },
  ];

  const handleCreatePost = () => {
    const chosen = CAPTION_PRESETS[selectedCaptionIdx];
    const newPost: InstaPost = {
      id: `post_${Date.now()}`,
      author: 'Eve ✨',
      authorHandle: '@eve.blossoming',
      avatar: '/assets/characters/eve_avatar.png',
      photoUrl: era === 1 
        ? '/assets/characters/eve_era1.png' 
        : era === 2 
        ? '/assets/characters/eve_era2.png'
        : era === 3
        ? '/assets/characters/eve_era3.png'
        : '/assets/characters/eve_era4.png',
      caption: chosen.caption,
      likes: era === 1 ? 24 : era === 2 ? 89 : era === 3 ? 240 : 850,
      isLiked: false,
      time: 'Just now',
      era,
      comments: [
        {
          id: `c_${Date.now()}_1`,
          author: 'Tara Higgins',
          avatar: '/assets/characters/tara_avatar.png',
          text: era === 1 
            ? 'MY GORGEOUS GIRL LOOK AT YOU!! Slaying from day 1 🔥'
            : era === 2 
            ? 'That jacket was MADE for you!! Hottest girl in the city!'
            : 'Unstoppable queen energy. The glow up is historical! 👑',
          time: 'Just now',
        },
        {
          id: `c_${Date.now()}_2`,
          author: 'The Nest Sanctuary',
          avatar: '/assets/characters/the_nest_avatar.png',
          text: 'The sisters are sending so much love your way Eve!! Keep blooming! 🌸✨',
          time: 'Just now',
        }
      ]
    };

    addInstaPost(newPost);
    setShowPostModal(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: InstaComment = {
      id: `c_user_${Date.now()}`,
      author: 'Eve ✨',
      avatar: '/assets/characters/eve_avatar.png',
      text,
      time: 'Just now',
    };

    addInstaComment(postId, newComment);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* App Top Bar */}
      <div className="p-3.5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center shadow-md">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
              InstaGlam
            </h2>
            <span className="text-[10px] text-slate-400 block -mt-0.5">@eve.blossoming</span>
          </div>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:brightness-110 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Snap</span>
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="p-3 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400">
              <img
                src="/assets/characters/eve_avatar.png"
                alt="Eve"
                className="w-full h-full rounded-full object-cover bg-slate-800"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border border-slate-950 flex items-center justify-center text-[9px] text-white font-bold">
              ✨
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm">Eve</span>
              <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-full font-mono">
                Era {era}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Trans & blossoming in the city 🌸🏳️‍⚧️</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-center text-xs pr-2">
          <div>
            <span className="font-bold block text-slate-200">{state.instaPosts.length}</span>
            <span className="text-[10px] text-slate-500">Snaps</span>
          </div>
          <div>
            <span className="font-bold block text-pink-400">{followersCount}</span>
            <span className="text-[10px] text-slate-500">Followers</span>
          </div>
          <div>
            <span className="font-bold block text-slate-300">{followingCount}</span>
            <span className="text-[10px] text-slate-500">Following</span>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
        {state.instaPosts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Post Header */}
            <div className="p-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-200">{post.author}</span>
                    <span className="text-[10px] text-slate-400">{post.authorHandle}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{post.time}</span>
                </div>
              </div>

              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-white/5">
                Era {post.era}
              </span>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square max-h-56 bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={post.photoUrl}
                alt="Post media"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Actions & Caption */}
            <div className="p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLikeInstaPost(post.id)}
                    className={`flex items-center gap-1.5 transition-transform active:scale-125 ${
                      post.isLiked ? 'text-pink-500 font-bold' : 'text-slate-400 hover:text-pink-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1 text-slate-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>

                <div className="text-[10px] text-pink-400/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Euphoria</span>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                <span className="font-bold mr-1 text-pink-300">eve.blossoming</span>
                {post.caption}
              </p>

              {/* Comments Section */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="text-xs bg-slate-950/40 p-2 rounded-xl flex items-start gap-2">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-5 h-5 rounded-full object-cover mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-slate-300">{comment.author}</span>
                        <span className="text-[9px] text-slate-500">{comment.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{comment.text}</p>
                    </div>
                  </div>
                ))}

                {/* Add Comment Input */}
                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Add a reply..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-pink-500 placeholder-slate-600"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="p-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showPostModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 p-4 flex flex-col justify-end animate-in fade-in">
          <div className="bg-slate-900 border border-pink-500/30 rounded-3xl p-4 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-400" />
                <h3 className="font-bold text-sm text-slate-100">Post New Mirror Selfie</h3>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Choose Your Caption & Mood:
              </label>
              <div className="space-y-2">
                {CAPTION_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCaptionIdx(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                      selectedCaptionIdx === idx
                        ? 'bg-pink-950/50 border-pink-500 text-pink-200'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-[10px] uppercase text-pink-400 mb-0.5">
                      {preset.tag}
                    </div>
                    <div>{preset.caption}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Perk: +5 Confidence, +5 Glam</span>
              <span>Outfit: Era {era} Match</span>
            </div>

            <button
              onClick={handleCreatePost}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Share to Feed</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
